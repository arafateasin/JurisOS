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
import { PricingPage } from "@/pages/pricing"
import { ContractReviewProductPage } from "@/pages/marketing/contract-review"
import { PlaybooksProductPage } from "@/pages/marketing/playbooks"
import { ComplianceProductPage } from "@/pages/marketing/compliance"
import { IntegrationsProductPage } from "@/pages/marketing/integrations"
import { SecurityPage } from "@/pages/marketing/security"
import { BlogPage } from "@/pages/marketing/blog"
import { CareersPage } from "@/pages/marketing/careers"
import { PrivacyPolicyPage } from "@/pages/marketing/privacy"
import { TermsOfServicePage } from "@/pages/marketing/terms"
import { DpaPage } from "@/pages/marketing/dpa"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { AuthGuard } from './components/auth/auth-guard';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import { DashboardPage } from './pages/dashboard';
import { PricingPage } from './pages/pricing';
import { SuccessPage } from './pages/success';
import { SubProcessorsPage } from "@/pages/marketing/sub-processors"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/product/contract-review" element={<ContractReviewProductPage />} />
      <Route path="/product/playbooks" element={<PlaybooksProductPage />} />
      <Route path="/product/compliance" element={<ComplianceProductPage />} />
      <Route path="/product/integrations" element={<IntegrationsProductPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/legal/terms" element={<TermsOfServicePage />} />
      <Route path="/legal/dpa" element={<DpaPage />} />
      <Route path="/legal/sub-processors" element={<SubProcessorsPage />} />
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
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={
              <AuthGuard requireAuth={false}>
                <LoginPage />
              </AuthGuard>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <AuthGuard requireAuth={false}>
                <SignupPage />
              </AuthGuard>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            } 
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route 
            path="/success" 
            element={
              <AuthGuard>
                <SuccessPage />
              </AuthGuard>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

  )
}