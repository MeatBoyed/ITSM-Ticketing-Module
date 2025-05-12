"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "@/lib/utils"
import { getStatusColor } from "@/lib/colors"
import { Search, Filter } from "lucide-react"
import type { Ticket } from "../types/ticket"
import { useState } from "react"
import { GetTicket } from "@/lib/TicketService"

interface TicketListProps {
  tickets: GetTicket[]
  selectedTicketId?: number
  onSelectTicket: (ticketId: number) => void
}

export function TicketList({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customers.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-[700px]">
      <div className="px-4 pb-3">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search tickets..."
            className="pl-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {filteredTickets.length} {filteredTickets.length === 1 ? "ticket" : "tickets"}
          </p>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Filter size={14} className="mr-1" />
            <span className="text-xs">Filter</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tickets found</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all
                  ${selectedTicketId === ticket.id
                    ? "bg-primary/5 border-primary/30"
                    : "bg-white hover:bg-gray-50 border-gray-100"
                  }
                `}
                onClick={() => onSelectTicket(ticket.id)}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <Badge variant="secondary" className={`${getStatusColor(ticket.status)} text-xs px-1.5 py-0`}>
                        {ticket.status}
                      </Badge>
                      {ticket.priority === "URGENT" && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs px-1.5 py-0">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-sm truncate">{ticket.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="truncate">{ticket.id}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDistanceToNow(ticket.created_at.toLocaleDateString())}</span>
                    </div>
                  </div>
                  {/* <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage
                      src={ticket.assignedAgent.avatar || "/placeholder.svg"}
                      alt={ticket.assignedAgent.name}
                    />
                    <AvatarFallback>{ticket.assignedAgent.name.charAt(0)}</AvatarFallback>
                  </Avatar> */}
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <Avatar className="h-5 w-5 mr-1">
                    <AvatarImage src="/placeholder.svg?height=20&width=20" alt={ticket.customers.name} />
                    <AvatarFallback>{ticket.customers.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-600 truncate">{ticket.customers.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
