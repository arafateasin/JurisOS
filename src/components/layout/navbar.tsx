import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { getUserSubscription } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { LogOut, Scale } from 'lucide-react';

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadSubscription();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadSubscription();
      } else {
        setSubscriptionStatus(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSubscription = async () => {
    try {
      const subscription = await getUserSubscription();
      if (subscription?.subscription_status) {
        setSubscriptionStatus(subscription.subscription_status);
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getPlanDisplay = () => {
    if (!subscriptionStatus) return 'Free Plan';
    
    if (subscriptionStatus === 'active') {
      return 'JurisOS Starter';
    }
    
    return 'Free Plan';
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">JurisOS</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Plan: <span className="font-medium text-foreground">{getPlanDisplay()}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}