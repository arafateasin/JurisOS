import { Routes, Route } from "react-router-dom"
import { LandingPage } from "@/pages/landing"
import { LoginPage } from "@/pages/auth/login"
import { SignupPage } from "@/pages/auth/signup"
import { OnboardingPage } from "@/pages/onboarding"
import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { DashboardPage } from "@/pages/dashboard"
import { MattersListPage } from "@/pages/matters/list"
import { MatterDetailPage } from "@/pages/matters/detail"
import { ContractsListPage } from "@/pages/contracts/list"
import { ContractDetailPage } from "@/pages/contracts/detail"
import { ReviewQueuePage } from "@/pages/review-queue"
import { ReviewWorkspacePage } from "@/pages/review-workspace"
import { PlaybooksListPage } from "@/pages/playbooks/list"
import { PlaybookBuilderPage } from "@/pages/playbooks/builder"
import { ComplianceDashboardPage } from "@/pages/compliance/dashboard"
import { ComplianceControlPage } from "@/pages/compliance/control"
import { AgentsPage } from "@/pages/agents"
import { ApprovalsPage } from "@/pages/approvals"
import { ReportsPage } from "@/pages/reports"
import { IntegrationsPage } from "@/pages/integrations"
import { AdminUsersPage } from "@/pages/admin/users"
import { AdminAuditPage } from "@/pages/admin/audit"
import { SettingsPage } from "@/pages/settings"
import { KnowledgeBasePage } from "@/pages/knowledge-base"
import { IntakePage } from "@/pages/intake"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/matters" element={<MattersListPage />} />
        <Route path="/matters/:id" element={<MatterDetailPage />} />
        <Route path="/contracts" element={<ContractsListPage />} />
        <Route path="/contracts/:id" element={<ContractDetailPage />} />
        <Route path="/review-queue" element={<ReviewQueuePage />} />
        <Route path="/review/:id" element={<ReviewWorkspacePage />} />
        <Route path="/playbooks" element={<PlaybooksListPage />} />
        <Route path="/playbooks/:id" element={<PlaybookBuilderPage />} />
        <Route path="/compliance" element={<ComplianceDashboardPage />} />
        <Route path="/compliance/:id" element={<ComplianceControlPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/intake" element={<IntakePage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/audit" element={<AdminAuditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
