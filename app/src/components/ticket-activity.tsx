import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  RefreshCw,
  User,
  PenToolIcon as Tool,
  Wrench,
} from "lucide-react"

interface ActivityUser {
  id: string
  name: string
  avatar: string
  role: "Agent" | "Technician" | "Manager" | "Customer" | "System"
}

interface Activity {
  id: string
  type: "status_change" | "comment" | "assignment" | "escalation" | "creation" | "technician_assignment" | "work_log"
  createdAt: string
  description: string
  note?: string
  user: ActivityUser
}

interface TicketActivityProps {
  activities: Activity[]
}

export function TicketActivity({ activities }: TicketActivityProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500">
        <Clock className="h-12 w-12 mb-4 text-gray-300" />
        <p>No activity recorded for this ticket yet</p>
      </div>
    )
  }

  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "status_change":
        return <RefreshCw size={16} className="text-blue-500" />
      case "comment":
        return <MessageSquare size={16} className="text-green-500" />
      case "assignment":
        return <User size={16} className="text-purple-500" />
      case "escalation":
        return <AlertTriangle size={16} className="text-orange-500" />
      case "creation":
        return <CheckCircle size={16} className="text-gray-500" />
      case "technician_assignment":
        return <Tool size={16} className="text-indigo-500" />
      case "work_log":
        return <Wrench size={16} className="text-cyan-500" />
      default:
        return <Clock size={16} className="text-gray-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Agent":
        return (
          <Badge variant="outline" className="text-xs ml-1 bg-purple-50 text-purple-700 border-purple-200">
            Agent
          </Badge>
        )
      case "Technician":
        return (
          <Badge variant="outline" className="text-xs ml-1 bg-cyan-50 text-cyan-700 border-cyan-200">
            Technician
          </Badge>
        )
      case "Manager":
        return (
          <Badge variant="outline" className="text-xs ml-1 bg-amber-50 text-amber-700 border-amber-200">
            Manager
          </Badge>
        )
      case "Customer":
        return (
          <Badge variant="outline" className="text-xs ml-1 bg-blue-50 text-blue-700 border-blue-200">
            Customer
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {sortedActivities.map((activity) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
          <div className="flex-1 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{activity.user.name}</span>
              {getRoleBadge(activity.user.role)}
              <span className="text-gray-500 text-xs ml-auto">{formatDate(activity.createdAt)}</span>
            </div>
            <p className="text-sm">{activity.description}</p>
            {activity.note && (
              <div className="mt-2 text-sm bg-white p-2 rounded border border-gray-200">{activity.note}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
