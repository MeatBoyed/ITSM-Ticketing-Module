export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

export interface Agent {
  id: string
  name: string
  role: string
  avatar: string
}

export interface Technician {
  id: string
  name: string
  specialization: string
  avatar: string
  availability: "Available" | "Busy" | "On Leave"
}

export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
}

export interface ActivityUser {
  id: string
  name: string
  avatar: string
  role: "Agent" | "Technician" | "Manager" | "Customer" | "System"
}

export interface Activity {
  id: string
  type: "status_change" | "comment" | "assignment" | "escalation" | "creation" | "technician_assignment" | "work_log"
  createdAt: string
  description: string
  note?: string
  user: ActivityUser
}

export type TicketStatus = "Open" | "In Progress" | "On Hold" | "Escalated" | "Resolved" | "Closed"

export type TicketPriority = "Low" | "Normal" | "High" | "Urgent"

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  team: string
  createdAt: string
  updatedAt: string
  customer: Customer
  assignedAgent: Agent
  assignedTechnician?: Technician
  location: Location
  activities?: Activity[]
  escalatedTo?: string
}
