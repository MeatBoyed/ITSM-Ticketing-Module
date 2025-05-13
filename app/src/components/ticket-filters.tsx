"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Ticket } from "@/types/ticket"
import { Filter } from "lucide-react"

interface TicketFiltersProps {
  tickets: Ticket[]
  filters: {
    status: string
    priority: string
    agent: string
  }
  setFilters: (filters: { priority: string; status: string; agent: string; }) => void
}

export function TicketFilters({ tickets, filters, setFilters }: TicketFiltersProps) {
  // Get unique statuses, priorities, and agents from tickets
  const statuses = ["all", ...new Set(tickets.map((ticket) => ticket.status))]
  const priorities = ["all", ...new Set(tickets.map((ticket) => ticket.priority))]
  const agents = [
    { id: "all", name: "All Agents" },
    ...Array.from(new Map(tickets.map((ticket) => [ticket.assignedAgent.id, ticket.assignedAgent])).values()),
  ]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={14} />
            <span>Status: {filters.status === "all" ? "All" : filters.status}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            {statuses.map((status) => (
              <DropdownMenuRadioItem key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={14} />
            <span>Priority: {filters.priority === "all" ? "All" : filters.priority}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filters.priority}
            onValueChange={(value) => setFilters({ ...filters, priority: value })}
          >
            {priorities.map((priority) => (
              <DropdownMenuRadioItem key={priority} value={priority}>
                {priority === "all" ? "All Priorities" : priority}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={14} />
            <span>
              Agent: {filters.agent === "all" ? "All" : agents.find((a) => a.id === filters.agent)?.name || "All"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filter by Agent</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={filters.agent}
            onValueChange={(value) => setFilters({ ...filters, agent: value })}
          >
            {agents.map((agent) => (
              <DropdownMenuRadioItem key={agent.id} value={agent.id}>
                {agent.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
