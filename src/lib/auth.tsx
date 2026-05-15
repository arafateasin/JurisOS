import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, metadata: SignUpMetadata) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

interface Profile {
  id: string
  tenant_id: string | null
  full_name: string
  role: string
  department: string
  avatar_url: string | null
  status: string
}

interface SignUpMetadata {
  full_name: string
  company_name: string
  role?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        fetchProfile(s.user.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        ;(async () => {
          await fetchProfile(s.user.id)
        })()
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    setProfile(data)
    setLoading(false)
  }

  async function signUp(email: string, password: string, metadata: SignUpMetadata) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.full_name,
          company_name: metadata.company_name,
        }
      }
    })

    if (error) return { error }

    if (data.user && data.session) {
      const slug = metadata.company_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({ name: metadata.company_name, slug: `${slug}-${Date.now()}` })
        .select()
        .single()

      if (tenantError) return { error: tenantError }

      if (tenant) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          tenant_id: tenant.id,
          full_name: metadata.full_name,
          role: metadata.role || 'admin',
          department: '',
        })

        if (profileError) return { error: profileError }
      }
    } else if (data.user && !data.session) {
      return { error: new Error('Signup succeeded but session not available. Please sign in.') }
    }

    return { error: null }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
