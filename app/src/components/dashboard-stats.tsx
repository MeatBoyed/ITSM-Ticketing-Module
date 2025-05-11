import { Card, CardContent } from "@/components/ui/card"
import { Clock, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"
import type { Ticket } from "@/types/ticket"
import { useTicketContext } from "@/contexts/TicketContext"

interface DashboardStatsProps {
  tickets: Ticket[]
}

export function DashboardStats() {
  const { tickets } = useTicketContext()
  // Calculate stats
  const openTickets = tickets.filter((t) => t.status === "IN_PROGRESS").length
  const urgentTickets = tickets.filter((t) => t.priority === "URGENT").length
  const resolvedToday = tickets.filter((t) => {
    const today = new Date().toISOString().split("T")[0]
    const ticketDate = new Date(t.updated_at).toISOString().split("T")[0]
    return t.status === "CLOSED" && ticketDate === today
  }).length

  // Calculate average resolution time (in hours) for resolved tickets
  const resolvedTickets = tickets.filter((t) => t.status === "IN_PROGRESS" || t.status === "CLOSED")
  let avgResolutionTime = 0

  if (resolvedTickets.length > 0) {
    const totalHours = resolvedTickets.reduce((total, ticket) => {
      const created = new Date(ticket.created_at).getTime()
      const updated = new Date(ticket.updated_at).getTime()
      return total + (updated - created) / (1000 * 60 * 60) // Convert ms to hours
    }, 0)
    avgResolutionTime = Math.round(totalHours / resolvedTickets.length)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-blue-50 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Open Tickets</p>
            <h3 className="text-2xl font-bold">{openTickets}</h3>
            <p className="text-xs text-gray-500 mt-1">{openTickets > 5 ? "Needs attention" : "Within target"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-red-50 p-3 rounded-full mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Urgent Issues</p>
            <h3 className="text-2xl font-bold">{urgentTickets}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {urgentTickets > 0 ? `${urgentTickets} need immediate action` : "No urgent issues"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-green-50 p-3 rounded-full mr-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Resolved Today</p>
            <h3 className="text-2xl font-bold">{resolvedToday}</h3>
            <p className="text-xs text-gray-500 mt-1">{resolvedToday > 3 ? "Great progress today" : "Keep going"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="bg-purple-50 p-3 rounded-full mr-4">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avg. Resolution Time</p>
            <h3 className="text-2xl font-bold">{avgResolutionTime}h</h3>
            <p className="text-xs text-gray-500 mt-1">
              {avgResolutionTime < 24 ? "Within SLA target" : "Above target time"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
