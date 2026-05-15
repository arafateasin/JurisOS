import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Upload } from "lucide-react"
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
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"

interface Contract {
  id: string
  contract_type: string
  counterparty: string
  status: string
  effective_date: string | null
  expiry_date: string | null
  value_amount: number | null
  document_id: string | null
  documents?: { title: string }[] | null
}

function StatusBadge({ status }: { status: string }) {
  if (status === "expiring_soon") return <Badge className="bg-warning/10 text-warning border-warning/20">Expiring soon</Badge>
  if (status === "under_review") return <Badge className="bg-info/10 text-info border-info/20">Under review</Badge>
  if (status === "pending_signature") return <Badge variant="secondary">Pending signature</Badge>
  if (status === "active") return <Badge variant="outline">Active</Badge>
  return <Badge variant="outline">{status.replace(/_/g, " ")}</Badge>
}

export function ContractsListPage() {
  const { profile, loading: authLoading } = useAuth()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    if (authLoading) return
    if (!profile?.tenant_id) {
      setLoading(false)
      return
    }
    fetchContracts()
  }, [profile?.tenant_id, authLoading])

  async function fetchContracts() {
    const { data } = await supabase
      .from("contracts")
      .select("id, contract_type, counterparty, status, effective_date, expiry_date, value_amount, document_id, documents(title)")
      .eq("tenant_id", profile!.tenant_id!)
      .order("created_at", { ascending: false })

    setContracts(data || [])
    setLoading(false)
  }

  const filtered = contracts.filter((c) => {
    const name = c.documents?.[0]?.title || c.counterparty
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || c.counterparty.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "all" || c.contract_type === typeFilter
    return matchSearch && matchType
  })

  function formatDate(date: string | null) {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  function formatValue(val: number | null) {
    if (!val) return "-"
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
          <p className="text-sm text-muted-foreground">Search, filter, and manage all agreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload contract
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search contracts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="msa">MSA</SelectItem>
            <SelectItem value="nda">NDA</SelectItem>
            <SelectItem value="dpa">DPA</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  {contracts.length === 0 ? "No contracts yet. Upload your first contract to get started." : "No contracts match your filters."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((contract) => (
                <TableRow key={contract.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/contracts/${contract.id}`} className="font-medium hover:underline">
                      {(contract.documents as { title: string } | null)?.title || contract.counterparty}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{contract.counterparty}</TableCell>
                  <TableCell><Badge variant="secondary">{contract.contract_type}</Badge></TableCell>
                  <TableCell><StatusBadge status={contract.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatValue(contract.value_amount)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(contract.expiry_date)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
