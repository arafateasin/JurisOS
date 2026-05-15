import { Link } from "react-router-dom"
import { Search, ListFilter as Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const reviews = [
  { id: "1", request: "MSA Review", document: "Acme_MSA_v2.docx", counterparty: "Acme Corp", risk: "High", stage: "Human review", sla: "2 hours", owner: "Sarah Chen" },
  { id: "2", request: "NDA Approval", document: "TechCo_NDA.pdf", counterparty: "TechCo", risk: "Low", stage: "Approval needed", sla: "Today", owner: "James Lee" },
  { id: "3", request: "DPA Compliance", document: "DataPro_DPA.docx", counterparty: "DataPro Ltd", risk: "Medium", stage: "AI reviewing", sla: "3 days", owner: "Sarah Chen" },
  { id: "4", request: "Vendor Agreement", document: "CloudVendor_SA.pdf", counterparty: "CloudVendor", risk: "Medium", stage: "Redline ready", sla: "1 week", owner: "Mike Park" },
  { id: "5", request: "Employment Template", document: "Offer_Letter_v3.docx", counterparty: "Internal", risk: "Low", stage: "Intake received", sla: "2 weeks", owner: "HR Team" },
  { id: "6", request: "Partnership Agreement", document: "PartnerCo_MOU.pdf", counterparty: "PartnerCo", risk: "High", stage: "Waiting for counterparty", sla: "5 days", owner: "James Lee" },
]

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    "Intake received": "bg-muted text-muted-foreground",
    "AI reviewing": "bg-info/10 text-info border-info/20",
    "Human review": "bg-warning/10 text-warning border-warning/20",
    "Redline ready": "bg-primary/10 text-primary border-primary/20",
    "Waiting for counterparty": "bg-muted text-muted-foreground",
    "Approval needed": "bg-ai/10 text-ai border-ai/20",
  }
  return <Badge className={styles[stage] || ""}>{stage}</Badge>
}

export function ReviewQueuePage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Review Queue</h1>
          <p className="text-sm text-muted-foreground">Prioritize and manage legal review work</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All items</TabsTrigger>
          <TabsTrigger value="my">My reviews</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="ai">AI in progress</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search queue..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            <SelectItem value="intake">Intake received</SelectItem>
            <SelectItem value="ai">AI reviewing</SelectItem>
            <SelectItem value="human">Human review</SelectItem>
            <SelectItem value="redline">Redline ready</SelectItem>
            <SelectItem value="approval">Approval needed</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risks</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.request}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{review.document}</TableCell>
                <TableCell className="text-muted-foreground">{review.counterparty}</TableCell>
                <TableCell>
                  <Badge
                    variant={review.risk === "High" ? "destructive" : "secondary"}
                    className={review.risk === "Medium" ? "bg-warning/10 text-warning border-warning/20" : review.risk === "Low" ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {review.risk}
                  </Badge>
                </TableCell>
                <TableCell><StageBadge stage={review.stage} /></TableCell>
                <TableCell className="text-muted-foreground">{review.sla}</TableCell>
                <TableCell className="text-muted-foreground">{review.owner}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/review/${review.id}`}>Open</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
