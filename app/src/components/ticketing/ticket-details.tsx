"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
// import type { Ticket, TicketStatus } from "@/types/ticket"
import { formatDate, formatDistanceToNow } from "@/lib/utils"
import { getStatusColor, getPriorityColor } from "@/lib/colors"
import {
  Clock,
  MessageSquare,
  User,
  Users,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  XCircle,
  Mail,
  Phone,
  FileText,
  BarChart3,
  MapPin,
  PenToolIcon as Tool,
} from "lucide-react"
import { TicketActivity } from "@/components/ticket-activity"
import { EscalateTicketDialog } from "@/components/dialogs/escalate-ticket-dialog"
import { ReassignTicketDialog } from "@/components/dialogs/reassign-ticket-dialog"
import { AssignTechnicianDialog } from "@/components/dialogs/assign-technician-dialog"
import { AddActivityForm } from "@/components/add-activity-form"
import { agents } from "../../../data/agents"
import { technicians } from "../../../data/technicians"
import { Activity, ActivityUser, Ticket, TicketStatus } from "../../types/ticket"
import { useTicketContext } from "@/contexts/TicketContext"
import { activity_type, ticket_status, user_role } from "@/generated/prisma"

export function TicketDetails() {
  const {
    selectedTicket: ticket,
    updateTicket,
  } = useTicketContext()

  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)
  const [resolutionNote, setResolutionNote] = useState("")
  const [isEscalateDialogOpen, setIsEscalateDialogOpen] = useState(false)
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false)
  const [isAssignTechnicianDialogOpen, setIsAssignTechnicianDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const currentUserRole: "Agent" | "Technician" = "Agent"

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-[700px] text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium">Select a ticket to view details</p>
        <p className="text-sm mt-2">Choose a ticket from the list to view and manage it</p>
      </div>
    )
  }

  // const updateTicketStatus = (status: ticket_status, note?: string) => {
  //   const updatedTicket = {
  //     ...ticket,
  //     status,
  //     updatedAt: new Date().toISOString(),
  //     activities: [
  //       ...(ticket.activities || []),
  //       {
  //         id: `act-${Date.now()}`,
  //         type: "status_change" as activity_type,
  //         createdAt: new Date().toISOString(),
  //         description: `Ticket status changed to ${status}`,
  //         note: note || "",
  //         user: {
  //           id: "current-user",
  //           name: "Current User",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //           role: currentUserRole as user_role,
  //         },
  //       },
  //     ],
  //   }

  //   updateTicket(updatedTicket)
  // }

  // const handleResolveTicket = () => {
  //   updateTicketStatus("Resolved", resolutionNote)
  //   setResolutionNote("")
  //   setIsResolveDialogOpen(false)
  // }

  // const handleEscalateTicket = (managerId: string, note: string) => {
  //   const updatedTicket = {
  //     ...ticket,
  //     status: "Escalated" as Ticket["status"],
  //     updatedAt: new Date().toISOString(),
  //     escalatedTo: managerId,
  //     activities: [
  //       ...(ticket.activities || []),
  //       {
  //         id: `act-${Date.now()}`,
  //         type: "escalation" as Activity["type"],
  //         createdAt: new Date().toISOString(),
  //         description: `Ticket escalated to manager`,
  //         note,
  //         user: {
  //           id: "current-user",
  //           name: "Current User",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //           role: currentUserRole as ActivityUser["role"],
  //         },
  //       },
  //     ],
  //   }

  //   updateTicket(updatedTicket)
  //   setIsEscalateDialogOpen(false)
  // }

  // const handleReassignTicket = (agentId: string, note: string) => {
  //   const agent = agents.find((a) => a.id === agentId)
  //   if (!agent) return

  //   const updatedTicket = {
  //     ...ticket,
  //     assignedAgent: agent,
  //     updatedAt: new Date().toISOString(),
  //     activities: [
  //       ...(ticket.activities || []),
  //       {
  //         id: `act-${Date.now()}`,
  //         type: "assignment" as Activity["type"],
  //         createdAt: new Date().toISOString(),
  //         description: `Ticket reassigned to ${agent.name}`,
  //         note,
  //         user: {
  //           id: "current-user",
  //           name: "Current User",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //           role: currentUserRole,
  //         },
  //       },
  //     ],
  //   }

  //   updateTicket(updatedTicket)
  //   setIsReassignDialogOpen(false)
  // }

  // const handleAssignTechnician = (technicianId: string, note: string) => {
  //   const technician = technicians.find((t) => t.id === technicianId)
  //   if (!technician) return

  //   const updatedTicket = {
  //     ...ticket,
  //     assignedTechnician: technician,
  //     updatedAt: new Date().toISOString(),
  //     activities: [
  //       ...(ticket.activities || []),
  //       {
  //         id: `act-${Date.now()}`,
  //         type: "technician_assignment" as Activity["type"],
  //         createdAt: new Date().toISOString(),
  //         description: `${ticket.assignedTechnician ? "Reassigned" : "Assigned"} technician ${technician.name}`,
  //         note: note,
  //         user: {
  //           id: "current-user",
  //           name: "Current User",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //           role: "Agent" as ActivityUser["role"],
  //         },
  //       },
  //     ],
  //   }

  //   updateTicket(updatedTicket)
  //   setIsAssignTechnicianDialogOpen(false)
  // }

  // const handleAddActivity = (type: string, note: string) => {
  //   const activityType = type as "comment" | "work_log"
  //   const description = activityType === "comment" ? "Added comment" : "Work log entry"

  //   const updatedTicket = {
  //     ...ticket,
  //     updatedAt: new Date().toISOString(),
  //     activities: [
  //       ...(ticket.activities || []),
  //       {
  //         id: `act-${Date.now()}`,
  //         type: activityType,
  //         createdAt: new Date().toISOString(),
  //         description,
  //         note,
  //         user: {
  //           id: "current-user",
  //           name: "Current User",
  //           avatar: "/placeholder.svg?height=40&width=40",
  //           role: currentUserRole,
  //         },
  //       },
  //     ],
  //   }

  //   updateTicket(updatedTicket)
  // }

  const getStatusActionButton = () => {
    switch (ticket.status) {
      case "NEW":
        return (
          // <Button variant="default" size="sm" className="flex items-center gap-1" onClick={() => updateTicketStatus("IN_PROGRESS")}>
          <Button variant="default" size="sm" className="flex items-center gap-1">
            <PlayCircle size={14} />
            <span>Start Working</span>
          </Button>
        )
      // Add other cases as needed
    }
  }

  return (
    // <div className="h-[700px] flex flex-col">
    <div className="flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className={`${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </Badge>
              <span className="text-sm text-gray-500">{ticket.id}</span>
            </div>
            <h2 className="text-xl font-semibold">{ticket.title}</h2>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              <span>Created {formatDistanceToNow(ticket.created_at.toLocaleDateString())} ago</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {getStatusActionButton()}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsReassignDialogOpen(true)}>
                  <Users size={14} className="mr-2" />
                  <span>Reassign Agent</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setIsAssignTechnicianDialogOpen(true)}>
                  <Tool size={14} className="mr-2" />
                  <span>{ticket.assignedTechnician ? "Reassign" : "Assign"} Technician</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEscalateDialogOpen(true)}>
                  <AlertTriangle size={14} className="mr-2" />
                  <span>Escalate Ticket</span>
                </DropdownMenuItem>
                {ticket.status !== "Resolved" && ticket.status !== "Closed" && (
                  <DropdownMenuItem onClick={() => setIsResolveDialogOpen(true)}>
                    <CheckCircle size={14} className="mr-2" />
                    <span>Resolve Ticket</span>
                  </DropdownMenuItem>
                )}
                {ticket.status === "Resolved" && (
                  <DropdownMenuItem onClick={() => updateTicketStatus("Closed")}>
                    <XCircle size={14} className="mr-2" />
                    <span>Close Ticket</span>
                  </DropdownMenuItem>
                )}
                {ticket.status === "Closed" && (
                  <DropdownMenuItem onClick={() => updateTicketStatus("Open")}>
                    <RefreshCw size={14} className="mr-2" />
                    <span>Reopen Ticket</span>
                  </DropdownMenuItem>
                )} */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b border-gray-100">
            <TabsList className="h-12 w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="customer"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                Customer
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="flex-1 overflow-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <FileText size={16} className="mr-2 text-gray-500" />
                    Ticket Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{ticket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Team:</span>
                      <span className="font-medium">{ticket.team}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="font-medium">{formatDate(ticket.created_at.toLocaleDateString())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Updated:</span>
                      <span className="font-medium">{formatDate(ticket.updated_at.toLocaleDateString())}</span>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    Location
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{ticket.location_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address:</span>
                      <span className="font-medium">{ticket.location_address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">City:</span>
                      <span className="font-medium">
                        {ticket.location_city}, {ticket.location_province}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assigned Agent */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    Assigned Agent
                  </h3>
                  <div className="flex items-center">
                    {/* <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={ticket.assignedAgent.avatar || "/placeholder.svg"}
                        alt={ticket.assignedAgent.name}
                      />
                      <AvatarFallback>{ticket.assignedAgent.name.charAt(0)}</AvatarFallback>
                    </Avatar> */}
                    {/* <div>
                      <p className="font-medium">{ticket.assignedAgent.name}</p>
                      <p className="text-xs text-gray-500">{ticket.assignedAgent.role}</p>
                    </div> */}
                    {/* <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setIsReassignDialogOpen(true)}>
                      Reassign
                    </Button> */}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Assigned Technician */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Tool size={16} className="mr-2 text-gray-500" />
                    Assigned Technician
                  </h3>
                  {ticket.assignedTechnician ? (
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={ticket.assignedTechnician.avatar || "/placeholder.svg"}
                          alt={ticket.assignedTechnician.name}
                        />
                        <AvatarFallback>{ticket.assignedTechnician.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{ticket.assignedTechnician.name}</p>
                        <p className="text-xs text-gray-500">{ticket.assignedTechnician.specialization}</p>
                      </div>
                      <Badge
                        className={`ml-auto ${ticket.assignedTechnician.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : ticket.assignedTechnician.availability === "Busy"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {ticket.assignedTechnician.availability}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500">No technician assigned</p>
                      <Button variant="outline" size="sm" onClick={() => setIsAssignTechnicianDialogOpen(true)}>
                        Assign Technician
                      </Button>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <User size={16} className="mr-2 text-gray-500" />
                    Customer Information
                  </h3>
                  <div className="flex items-center mb-3">
                    {/* <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/placeholder.svg" alt={ticket.customer.name} />
                      <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar> */}
                    <div>
                      {/* <p className="font-medium">{ticket.customer.name}</p>
                      <p className="text-xs text-gray-500">{ticket.customer.email}</p> */}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={14} className="mr-2 text-gray-500" />
                      {/* <span>{ticket.customer.email}</span> */}
                    </div>
                    <div className="flex items-center">
                      <Phone size={14} className="mr-2 text-gray-500" />
                      {/* <span>{ticket.customer.phone}</span> */}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                      <MessageSquare size={14} />
                      <span>Open Helpdesk Chat</span>
                    </Button>
                  </div>
                </div>

                {/* SLA Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <BarChart3 size={16} className="mr-2 text-gray-500" />
                    SLA Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Response Time:</span>
                      <span className="font-medium text-green-600">Within Target</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Resolution Target:</span>
                      <span className="font-medium">
                        {ticket.priority === "URGENT" ? "4 hours" : ticket.priority === "HIGH" ? "8 hours" : "24 hours"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Elapsed:</span>
                      <span className="font-medium">{formatDistanceToNow(ticket.created_at.toLocaleDateString())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium mb-3">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm whitespace-pre-line">{ticket.description}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="flex-1 overflow-auto p-6 space-y-6">
            {/* <AddActivityForm onAddActivity={handleAddActivity} userRole={currentUserRole} />
            <TicketActivity activities={ticket.activities || []} /> */}
          </TabsContent>

          <TabsContent value="customer" className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                {/* <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="/placeholder.svg" alt={ticket.customer.name} />
                    <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{ticket.customer.name}</h3>
                    <p className="text-gray-500">{ticket.customer.email}</p>
                    <p className="text-gray-500">{ticket.customer.phone}</p>
                  </div>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Button className="flex items-center justify-center gap-2">
                    <Mail size={16} />
                    <span>Send Email</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    <span>Open Chat</span>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Recent Tickets</h3>
                <div className="space-y-2">
                  <div className="bg-white border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-sm">Password reset issue</h4>
                        <p className="text-xs text-gray-500">TKT-1005 • Resolved 3 days ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Resolved
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-sm">Email configuration</h4>
                        <p className="text-xs text-gray-500">TKT-982 • Closed 2 weeks ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Closed
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resolve Ticket Dialog */}
      {/* <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Ticket</DialogTitle>
            <DialogDescription>Add a resolution note to explain how this ticket was resolved.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Describe how the issue was resolved..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveTicket}>Resolve Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Escalate Ticket Dialog */}
      {/* <EscalateTicketDialog
        open={isEscalateDialogOpen}
        onOpenChange={setIsEscalateDialogOpen}
        onEscalate={handleEscalateTicket}
      /> */}

      {/* Reassign Ticket Dialog */}
      {/* <ReassignTicketDialog
        open={isReassignDialogOpen}
        onOpenChange={setIsReassignDialogOpen}
        onReassign={handleReassignTicket}
        currentAgent={ticket.assignedAgent}
      /> */}

      {/* Assign Technician Dialog */}
      {/* <AssignTechnicianDialog
        open={isAssignTechnicianDialogOpen}
        onOpenChange={setIsAssignTechnicianDialogOpen}
        onAssign={handleAssignTechnician}
        currentTechnician={ticket.assignedTechnician}
      /> */}
    </div>
  )
}
