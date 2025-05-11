"use client"

import { useState } from "react"
import { TicketList } from "@/components/ticket-list"
import { TicketDetails } from "@/components/ticketing/ticket-details"
import { TicketFilters } from "@/components/ticket-filters"
import type { Ticket } from "../types/ticket"
import { dummyTickets } from "../../data/dummy-tickets"

export function TicketDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>(dummyTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    agent: "all",
  })

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.status !== "all" && ticket.status !== filters.status) return false
    if (filters.priority !== "all" && ticket.priority !== filters.priority) return false
    if (filters.agent !== "all" && ticket.assignedAgent.id !== filters.agent) return false
    return true
  })

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    const updatedTickets = tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    setTickets(updatedTickets)
    setSelectedTicket(updatedTicket)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ticket Tracker</h1>
          <div className="flex space-x-2">
            <TicketFilters tickets={tickets} filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/5">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicket?.id}
              onSelectTicket={(ticket) => setSelectedTicket(ticket)}
            />
          </div>
          <div className="w-full lg:w-3/5 bg-white rounded-lg shadow">
            {selectedTicket ? (
              <TicketDetails ticket={selectedTicket} onUpdateTicket={handleUpdateTicket} />
            ) : (
              <div className="flex items-center justify-center h-[600px] text-gray-400">
                <p>Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
