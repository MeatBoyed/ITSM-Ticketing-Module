"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketList } from "@/components/ticket-list"
import { TicketDetails } from "@/components/ticket-details"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { dummyTickets } from "../../data/dummy-tickets"
import type { Ticket } from "../../types/ticket"

export function TicketingDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>(dummyTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  // Count tickets by status
  const ticketCounts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    onHold: tickets.filter((t) => t.status === "On Hold").length,
    escalated: tickets.filter((t) => t.status === "Escalated").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
    closed: tickets.filter((t) => t.status === "Closed").length,
  }

  // Filter tickets based on active tab
  const getFilteredTickets = () => {
    switch (activeTab) {
      case "open":
        return tickets.filter((t) => t.status === "Open")
      case "inProgress":
        return tickets.filter((t) => t.status === "In Progress")
      case "onHold":
        return tickets.filter((t) => t.status === "On Hold")
      case "escalated":
        return tickets.filter((t) => t.status === "Escalated")
      case "resolved":
        return tickets.filter((t) => t.status === "Resolved")
      case "closed":
        return tickets.filter((t) => t.status === "Closed")
      case "urgent":
        return tickets.filter((t) => t.priority === "Urgent")
      case "all":
      default:
        return tickets
    }
  }

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    const updatedTickets = tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    setTickets(updatedTickets)
    setSelectedTicket(updatedTicket)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <DashboardStats tickets={tickets} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 xl:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4 pt-4">
                  <h2 className="text-xl font-semibold mb-4">Tickets</h2>
                  <TabsList className="w-full grid grid-cols-4 h-auto">
                    <TabsTrigger value="all" className="py-2">
                      All
                      <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">{ticketCounts.all}</span>
                    </TabsTrigger>
                    <TabsTrigger value="open" className="py-2">
                      Open
                      <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                        {ticketCounts.open}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="inProgress" className="py-2">
                      Active
                      <span className="ml-1 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
                        {ticketCounts.inProgress}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="urgent" className="py-2">
                      Urgent
                      <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                        {tickets.filter((t) => t.priority === "Urgent").length}
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="m-0 mt-4">
                  <TicketList
                    tickets={getFilteredTickets()}
                    selectedTicketId={selectedTicket?.id}
                    onSelectTicket={setSelectedTicket}
                  />
                </TabsContent>

                <TabsContent value="open" className="m-0 mt-4">
                  <TicketList
                    tickets={getFilteredTickets()}
                    selectedTicketId={selectedTicket?.id}
                    onSelectTicket={setSelectedTicket}
                  />
                </TabsContent>

                <TabsContent value="inProgress" className="m-0 mt-4">
                  <TicketList
                    tickets={getFilteredTickets()}
                    selectedTicketId={selectedTicket?.id}
                    onSelectTicket={setSelectedTicket}
                  />
                </TabsContent>

                <TabsContent value="urgent" className="m-0 mt-4">
                  <TicketList
                    tickets={getFilteredTickets()}
                    selectedTicketId={selectedTicket?.id}
                    onSelectTicket={setSelectedTicket}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-9">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
              {selectedTicket ? (
                <TicketDetails ticket={selectedTicket} onUpdateTicket={handleUpdateTicket} />
              ) : (
                <div className="flex flex-col items-center justify-center h-[700px] text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Select a ticket to view details</p>
                  <p className="text-sm mt-2">Choose a ticket from the list to view and manage it</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
