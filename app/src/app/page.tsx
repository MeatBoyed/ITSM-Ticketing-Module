import { TicketingDashboard } from "@/components/ticketing-dashboard"
import { TicketProvider } from "@/contexts/TicketContext"
import { dummyTickets } from "../../data/dummy-tickets"
import { getTickets } from "@/lib/TicketService"

export const dynamic = "force-dynamic"

export default async function Home() {
  const tickets = await getTickets()

  return (
    <main className="container mx-auto px-4 py-6">
      <TicketProvider initialTickets={tickets}>
        <TicketingDashboard />
      </TicketProvider>
    </main>
  )
}
