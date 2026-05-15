/*
  # Remove potentially recursive tenant profiles policy

  1. Changes
    - Drop "Users can view tenant profiles" to prevent any recursion risk
    - The "Users can view own profile" policy (id = auth.uid()) remains and is sufficient for frontend use

  2. Notes
    - All dashboard queries only fetch the current user's profile
    - Admin/tenant-wide queries will use service role via edge functions
*/

DROP POLICY IF EXISTS "Users can view tenant profiles" ON profiles;
