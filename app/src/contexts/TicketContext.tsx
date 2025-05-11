"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Ticket } from "@/types/ticket"
import { dummyTickets } from "../../data/dummy-tickets"

type TicketContextType = {
    tickets: Ticket[]
    setTickets: (tickets: Ticket[]) => void
    selectedTicket: Ticket | null
    setSelectedTicket: (ticket: Ticket | null) => void
    updateTicket: (updatedTicket: Ticket) => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export const TicketProvider = ({ children }: { children: ReactNode }) => {
    const [tickets, setTickets] = useState<Ticket[]>(dummyTickets)
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
    const [activeTab, setActiveTab] = useState<string>("all")

    const updateTicket = useCallback((updated: Ticket) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t))
        )
        setSelectedTicket(updated)
    }, [])


    return (
        <TicketContext.Provider value={{ tickets, setTickets, selectedTicket, setSelectedTicket, updateTicket, activeTab, setActiveTab, }}>
            {children}
        </TicketContext.Provider>
    )
}

export const useTicketContext = () => {
    const context = useContext(TicketContext)
    if (!context) throw new Error("useTicketContext must be used within a TicketProvider")
    return context
}
