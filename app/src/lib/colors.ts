export function getStatusColor(status: string): string {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "In Progress":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "On Hold":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Escalated":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "Resolved":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Closed":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "Low":
      return "bg-green-50 text-green-700 border-green-200"
    case "Normal":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200"
    case "Urgent":
      return "bg-red-50 text-red-700 border-red-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}
