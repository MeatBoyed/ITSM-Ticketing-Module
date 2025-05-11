"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketList } from "@/components/ticket-list"
import { TicketDetails } from "@/components/ticketing/ticket-details"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { dummyTickets } from "../../data/dummy-tickets"
import type { Ticket } from "../types/ticket"
import { useTicketContext } from "@/contexts/TicketContext"
import { TicketsList } from "./ticketing/tickets-list"

export function TicketingDashboard() {
  const { tickets, setTickets, selectedTicket, setSelectedTicket, updateTicket, activeTab, setActiveTab } = useTicketContext()

  // Count tickets by status

  // Filter tickets based on active tab


  const handleUpdateTicket = (updatedTicket: Ticket) => {
    const updatedTickets = tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    setTickets(updatedTickets)
    setSelectedTicket(updatedTicket)
  }

  return (
    <>
      <DashboardStats />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 xl:col-span-3 space-y-6">
          <TicketsList />
        </div>

        <div className="lg:col-span-7 xl:col-span-9">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
            {selectedTicket ? (
              <TicketDetails />
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
    </>
  )
}
