export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          plan: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          plan?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          plan?: string
          settings?: Json
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          tenant_id: string
          email: string
          full_name: string
          role: string
          department: string | null
          avatar_url: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          tenant_id: string
          email: string
          full_name: string
          role?: string
          department?: string | null
          avatar_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          tenant_id?: string
          email?: string
          full_name?: string
          role?: string
          department?: string | null
          avatar_url?: string | null
          status?: string
          updated_at?: string
        }
      }
      matters: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          matter_type: string
          status: string
          priority: string
          owner_id: string
          counterparty: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          matter_type: string
          status?: string
          priority?: string
          owner_id: string
          counterparty?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          matter_type?: string
          status?: string
          priority?: string
          owner_id?: string
          counterparty?: string | null
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          tenant_id: string
          matter_id: string
          title: string
          file_path: string
          file_type: string
          file_size: number
          version: number
          status: string
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          matter_id: string
          title: string
          file_path: string
          file_type: string
          file_size: number
          version?: number
          status?: string
          uploaded_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          file_path?: string
          file_type?: string
          file_size?: number
          version?: number
          status?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          tenant_id: string
          matter_id: string
          document_id: string
          contract_type: string
          counterparty: string
          status: string
          effective_date: string | null
          expiry_date: string | null
          value: number | null
          risk_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          matter_id: string
          document_id: string
          contract_type: string
          counterparty: string
          status?: string
          effective_date?: string | null
          expiry_date?: string | null
          value?: number | null
          risk_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          contract_type?: string
          counterparty?: string
          status?: string
          effective_date?: string | null
          expiry_date?: string | null
          value?: number | null
          risk_level?: string | null
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          tenant_id: string
          document_id: string
          playbook_id: string | null
          status: string
          overall_risk: string | null
          confidence: number | null
          started_at: string
          completed_at: string | null
          reviewed_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          document_id: string
          playbook_id?: string | null
          status?: string
          overall_risk?: string | null
          confidence?: number | null
          started_at?: string
          completed_at?: string | null
          reviewed_by?: string | null
          created_at?: string
        }
        Update: {
          status?: string
          overall_risk?: string | null
          confidence?: number | null
          completed_at?: string | null
          reviewed_by?: string | null
        }
      }
      review_findings: {
        Row: {
          id: string
          tenant_id: string
          review_id: string
          clause_type: string
          section: string | null
          risk_level: string
          source_quote: string
          issue: string
          recommended_action: string
          suggested_language: string | null
          status: string
          requires_approval: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          review_id: string
          clause_type: string
          section?: string | null
          risk_level: string
          source_quote: string
          issue: string
          recommended_action: string
          suggested_language?: string | null
          status?: string
          requires_approval?: boolean
          created_at?: string
        }
        Update: {
          status?: string
          suggested_language?: string | null
        }
      }
      playbooks: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          contract_type: string
          version: number
          status: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          contract_type: string
          version?: number
          status?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          contract_type?: string
          version?: number
          status?: string
          updated_at?: string
        }
      }
      playbook_rules: {
        Row: {
          id: string
          tenant_id: string
          playbook_id: string
          clause_type: string
          risk_level: string
          preferred_position: string
          fallback_language: string | null
          escalation_rule: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          playbook_id: string
          clause_type: string
          risk_level: string
          preferred_position: string
          fallback_language?: string | null
          escalation_rule?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          clause_type?: string
          risk_level?: string
          preferred_position?: string
          fallback_language?: string | null
          escalation_rule?: string | null
          order_index?: number
        }
      }
      approvals: {
        Row: {
          id: string
          tenant_id: string
          resource_type: string
          resource_id: string
          action: string
          status: string
          requested_by: string
          assigned_to: string | null
          decided_by: string | null
          decision_reason: string | null
          created_at: string
          decided_at: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          resource_type: string
          resource_id: string
          action: string
          status?: string
          requested_by: string
          assigned_to?: string | null
          decided_by?: string | null
          decision_reason?: string | null
          created_at?: string
          decided_at?: string | null
        }
        Update: {
          status?: string
          assigned_to?: string | null
          decided_by?: string | null
          decision_reason?: string | null
          decided_at?: string | null
        }
      }
      compliance_frameworks: {
        Row: {
          id: string
          tenant_id: string
          name: string
          description: string | null
          version: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          description?: string | null
          version?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          version?: string | null
          status?: string
        }
      }
      controls: {
        Row: {
          id: string
          tenant_id: string
          framework_id: string
          control_id: string
          title: string
          description: string | null
          status: string
          owner_id: string | null
          evidence_status: string
          last_assessed: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          framework_id: string
          control_id: string
          title: string
          description?: string | null
          status?: string
          owner_id?: string | null
          evidence_status?: string
          last_assessed?: string | null
          created_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          status?: string
          owner_id?: string | null
          evidence_status?: string
          last_assessed?: string | null
        }
      }
      agent_runs: {
        Row: {
          id: string
          tenant_id: string
          agent_type: string
          status: string
          input_summary: string | null
          output_summary: string | null
          tokens_used: number
          cost: number
          model_used: string
          started_at: string
          completed_at: string | null
          triggered_by: string
        }
        Insert: {
          id?: string
          tenant_id: string
          agent_type: string
          status?: string
          input_summary?: string | null
          output_summary?: string | null
          tokens_used?: number
          cost?: number
          model_used?: string
          started_at?: string
          completed_at?: string | null
          triggered_by: string
        }
        Update: {
          status?: string
          output_summary?: string | null
          tokens_used?: number
          cost?: number
          completed_at?: string | null
        }
      }
      audit_events: {
        Row: {
          id: string
          tenant_id: string
          actor_type: string
          actor_id: string
          action: string
          resource_type: string
          resource_id: string | null
          result: string
          ip_address: string | null
          user_agent: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          actor_type: string
          actor_id: string
          action: string
          resource_type: string
          resource_id?: string | null
          result?: string
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: never
      }
    }
  }
}
