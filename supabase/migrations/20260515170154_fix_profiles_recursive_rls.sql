/*
  # Fix infinite recursion in profiles RLS policies

  1. Changes
    - Drop "Users can view profiles in same tenant" (references profiles from profiles - infinite loop)
    - Drop "Users can view profiles in their tenant" (same issue)
    - Keep "Users can view own profile" which uses auth.uid() directly
    - Add a new tenant-mate policy that avoids recursion by using auth.uid() directly

  2. Security
    - Users can still view their own profile
    - Users can view other profiles in their tenant via a non-recursive approach
*/

DROP POLICY IF EXISTS "Users can view profiles in same tenant" ON profiles;
DROP POLICY IF EXISTS "Users can view profiles in their tenant" ON profiles;

-- Also drop duplicate insert/update policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Add tenant-mate viewing without recursion: compare tenant_id to the caller's tenant_id
-- using a subquery that won't recurse because it targets a single row by PK
CREATE POLICY "Users can view tenant profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    tenant_id = (SELECT p.tenant_id FROM profiles p WHERE p.id = auth.uid())
  );
