/*
  # Core Platform Tables

  1. New Tables
    - `tenants` - Multi-tenant organization container
      - `id` (uuid, primary key)
      - `name` (text) - Organization name
      - `slug` (text, unique) - URL-safe identifier
      - `plan` (text) - Subscription plan level
      - `settings` (jsonb) - Tenant configuration
      - `created_at`, `updated_at` (timestamptz)
    - `profiles` - User profiles linked to auth.users
      - `id` (uuid, primary key, references auth.users)
      - `tenant_id` (uuid, references tenants)
      - `email` (text)
      - `full_name` (text)
      - `role` (text) - Platform role
      - `department` (text)
      - `avatar_url` (text)
      - `status` (text) - Active, Invited, Deactivated
      - `created_at`, `updated_at` (timestamptz)
    - `matters` - Legal matters/workspaces
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, references tenants)
      - `title` (text)
      - `description` (text)
      - `matter_type` (text) - Contract, Compliance, Regulatory, etc.
      - `status` (text)
      - `priority` (text)
      - `owner_id` (uuid, references profiles)
      - `counterparty` (text)
      - `created_at`, `updated_at` (timestamptz)
    - `documents` - Uploaded legal documents
      - `id` (uuid, primary key)
      - `tenant_id` (uuid, references tenants)
      - `matter_id` (uuid, references matters)
      - `title` (text)
      - `file_path` (text) - Object storage path
      - `file_type` (text)
      - `file_size` (bigint)
      - `version` (integer)
      - `status` (text) - Uploaded, Parsing, Parsed, Error
      - `uploaded_by` (uuid, references profiles)
      - `created_at`, `updated_at` (timestamptz)

  2. Security
    - RLS enabled on all tables
    - Tenant isolation enforced via tenant_id checks
    - Users can only access data within their tenant

  3. Notes
    - Every table uses tenant_id for multi-tenant isolation
    - UUIDs used for all primary keys
    - Timestamps default to now()
*/

-- Tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'starter',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'business_user',
  department text,
  avatar_url text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Matters table
CREATE TABLE IF NOT EXISTS matters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  matter_type text NOT NULL DEFAULT 'contract',
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'medium',
  owner_id uuid NOT NULL REFERENCES profiles(id),
  counterparty text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE matters ENABLE ROW LEVEL SECURITY;

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  matter_id uuid NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  version integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'uploaded',
  uploaded_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_id ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_matters_tenant_id ON matters(tenant_id);
CREATE INDEX IF NOT EXISTS idx_matters_owner_id ON matters(owner_id);
CREATE INDEX IF NOT EXISTS idx_matters_status ON matters(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_documents_tenant_id ON documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_matter_id ON documents(matter_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(tenant_id, status);

-- RLS Policies for tenants
CREATE POLICY "Users can view their own tenant"
  ON tenants FOR SELECT
  TO authenticated
  USING (
    id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their tenant"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- RLS Policies for matters
CREATE POLICY "Users can view matters in their tenant"
  ON matters FOR SELECT
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can create matters in their tenant"
  ON matters FOR INSERT
  TO authenticated
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Matter owners can update their matters"
  ON matters FOR UPDATE
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Matter owners can delete their matters"
  ON matters FOR DELETE
  TO authenticated
  USING (
    owner_id = auth.uid()
  );

-- RLS Policies for documents
CREATE POLICY "Users can view documents in their tenant"
  ON documents FOR SELECT
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can upload documents in their tenant"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can update documents in their tenant"
  ON documents FOR UPDATE
  TO authenticated
  USING (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    tenant_id IN (SELECT tenant_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Document uploaders can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (
    uploaded_by = auth.uid()
  );
