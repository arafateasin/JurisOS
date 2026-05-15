/*
  # Fix signup RLS policies

  1. Changes
    - Add INSERT policy on `tenants` table so authenticated users can create a tenant during signup
    - Add a SELECT policy on `profiles` so users can always view their own profile (fixes circular dependency)

  2. Security
    - INSERT on tenants restricted to authenticated users only
    - Users can only read their own profile directly by matching auth.uid()
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tenants' AND policyname = 'Authenticated users can create a tenant'
  ) THEN
    CREATE POLICY "Authenticated users can create a tenant"
      ON tenants
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (id = auth.uid());
  END IF;
END $$;
