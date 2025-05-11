import { TicketList } from "../ticket-list";
import { useTicketContext } from "@/contexts/TicketContext";
import { useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


export function TicketsList() {
    const { tickets, selectedTicket, setSelectedTicket, activeTab, setActiveTab, } = useTicketContext();

    const ticketCounts = useCallback(() => {
        return {
            all: tickets.length,
            open: tickets.filter((t) => t.status === "Open").length,
            inProgress: tickets.filter((t) => t.status === "In Progress").length,
            onHold: tickets.filter((t) => t.status === "On Hold").length,
            escalated: tickets.filter((t) => t.status === "Escalated").length,
            resolved: tickets.filter((t) => t.status === "Resolved").length,
            closed: tickets.filter((t) => t.status === "Closed").length,
        }
    }, [tickets])

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
    return (

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4 pt-4">
                    <h2 className="text-xl font-semibold mb-4">Tickets</h2>
                    <TabsList className="w-full grid grid-cols-4 h-auto">
                        <TabsTrigger value="all" className="py-2">
                            All
                            <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">{ticketCounts().all}</span>
                        </TabsTrigger>
                        <TabsTrigger value="open" className="py-2">
                            Open
                            <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                                {ticketCounts().open}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="inProgress" className="py-2">
                            Active
                            <span className="ml-1 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">
                                {ticketCounts().inProgress}
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
    )
}