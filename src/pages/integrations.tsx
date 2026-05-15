import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const integrations = [
  { name: "Google Drive", category: "Document Storage", status: "Connected", lastSync: "2 hours ago", permissions: "Read & Write", icon: "GD" },
  { name: "Microsoft SharePoint", category: "Document Storage", status: "Not connected", lastSync: null, permissions: null, icon: "SP" },
  { name: "DocuSign", category: "E-Signature", status: "Connected", lastSync: "1 day ago", permissions: "Read & Send", icon: "DS" },
  { name: "Slack", category: "Communication", status: "Connected", lastSync: "5 min ago", permissions: "Notifications", icon: "SL" },
  { name: "Microsoft Teams", category: "Communication", status: "Not connected", lastSync: null, permissions: null, icon: "MT" },
  { name: "Salesforce", category: "CRM", status: "Not connected", lastSync: null, permissions: null, icon: "SF" },
  { name: "Okta", category: "Identity", status: "Connected", lastSync: "Real-time", permissions: "SSO & SCIM", icon: "OK" },
  { name: "Vanta", category: "Compliance", status: "Connected", lastSync: "30 min ago", permissions: "Read controls", icon: "VA" },
  { name: "Jira", category: "Project Management", status: "Not connected", lastSync: null, permissions: null, icon: "JR" },
  { name: "GitHub", category: "Development", status: "Connected", lastSync: "1 hour ago", permissions: "Read repos", icon: "GH" },
  { name: "AWS", category: "Cloud", status: "Connected", lastSync: "15 min ago", permissions: "Read IAM & logs", icon: "AW" },
  { name: "HubSpot", category: "CRM", status: "Not connected", lastSync: null, permissions: null, icon: "HS" },
]

export function IntegrationsPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect the systems your legal and compliance teams already use</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="storage">Document Storage</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                  {integration.icon}
                </div>
                <Badge
                  variant={integration.status === "Connected" ? "secondary" : "outline"}
                  className={integration.status === "Connected" ? "bg-success/10 text-success border-success/20" : ""}
                >
                  {integration.status}
                </Badge>
              </div>
              <h3 className="text-sm font-medium">{integration.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{integration.category}</p>
              {integration.status === "Connected" ? (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Permissions</span>
                    <span className="font-medium">{integration.permissions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last sync</span>
                    <span className="font-medium">{integration.lastSync}</span>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full mt-1">Connect</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
