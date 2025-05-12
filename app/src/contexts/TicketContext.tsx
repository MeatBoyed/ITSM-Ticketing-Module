"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Ticket } from "@/types/ticket"
import { dummyTickets } from "../../data/dummy-tickets"
import { tickets } from "@/generated/prisma"
import { getTicket, GetTicket, TicketDetails } from "@/lib/TicketService"

type TicketContextType = {
    tickets: GetTicket[]
    setTickets: (tickets: GetTicket[]) => void
    selectedTicket: GetTicket | null
    // setSelectedTicket: (ticket: GetTicket | null) => void
    selectTicket: (ticketId: number) => void
    updateTicket: (updatedTicket: GetTicket) => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

interface TicketProviderProps {
    initialTickets: GetTicket[]
    children: React.ReactNode
}

export const TicketProvider = ({ initialTickets, children }: TicketProviderProps) => {
    const [tickets, setTickets] = useState<GetTicket[]>(initialTickets)
    const [selectedTicket, setSelectedTicket] = useState<GetTicket | null>(null)
    const [activeTab, setActiveTab] = useState<string>("all")

    const updateTicket = useCallback((updated: GetTicket) => {
        // setTickets((prev) =>
        //     prev.map((t) => (t.id === updated.id ? updated : t))
        // )
        // setSelectedTicket(updated)
    }, [])

    const selectTicket = async (ticketId: number) => {
        const fullTicket = await getTicket(ticketId)
        setSelectedTicket(fullTicket)
    }

    return (
        <TicketContext.Provider value={{ tickets, setTickets, selectedTicket, selectTicket, updateTicket, activeTab, setActiveTab }}>
            {children}
        </TicketContext.Provider>
    )
}

export const useTicketContext = () => {
    const context = useContext(TicketContext)
    if (!context) throw new Error("useTicketContext must be used within a TicketProvider")
    return context
}
