import { Shield, Plus, MoveHorizontal as MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  { name: "Sarah Chen", email: "sarah.chen@company.com", role: "Admin", department: "Legal", status: "Active", lastActive: "2 min ago" },
  { name: "James Lee", email: "james.lee@company.com", role: "Legal Counsel", department: "Legal", status: "Active", lastActive: "1 hour ago" },
  { name: "Maria Garcia", email: "maria.garcia@company.com", role: "Compliance Lead", department: "Compliance", status: "Active", lastActive: "30 min ago" },
  { name: "David Kim", email: "david.kim@company.com", role: "Reviewer", department: "Legal", status: "Active", lastActive: "3 hours ago" },
  { name: "Emily Watson", email: "emily.watson@company.com", role: "Business User", department: "Sales", status: "Active", lastActive: "1 day ago" },
  { name: "Michael Brown", email: "michael.brown@company.com", role: "Reviewer", department: "Legal", status: "Invited", lastActive: "—" },
  { name: "Lisa Park", email: "lisa.park@company.com", role: "Business User", department: "Engineering", status: "Active", lastActive: "5 hours ago" },
  { name: "Robert Taylor", email: "robert.taylor@company.com", role: "Admin", department: "IT", status: "Active", lastActive: "15 min ago" },
]

const roles = [
  { name: "Admin", description: "Full platform access, user management, billing", users: 2, permissions: "All" },
  { name: "Legal Counsel", description: "Full legal workflow access, approve AI outputs", users: 1, permissions: "Legal ops, Compliance, Approvals" },
  { name: "Compliance Lead", description: "Compliance module access, evidence management", users: 1, permissions: "Compliance, Reports, Knowledge Base" },
  { name: "Reviewer", description: "Review and approve contracts and findings", users: 2, permissions: "Review, Approvals, Matters" },
  { name: "Business User", description: "Submit requests and view matter status", users: 2, permissions: "Intake, View matters" },
]

export function AdminUsersPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">Manage team members and their access levels</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite user
        </Button>
      </div>

      <Tabs defaultValue="users" className="mb-6">
        <TabsList>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="roles">Roles ({roles.length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={user.status === "Active" ? "bg-success/10 text-success border-success/20" : ""}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit role</DropdownMenuItem>
                        <DropdownMenuItem>View activity</DropdownMenuItem>
                        <DropdownMenuItem>Reset password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Roles & Permissions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">{role.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-xs text-muted-foreground">{role.description}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{role.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Access</span>
                    <span className="font-medium">{role.permissions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
