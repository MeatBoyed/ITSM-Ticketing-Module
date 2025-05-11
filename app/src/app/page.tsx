import { TicketingDashboard } from "@/components/ticketing-dashboard"
import { TicketProvider } from "@/contexts/TicketContext"
import { getUsers } from "@/lib/TicketService"

export default async function Home() {
  const tickets = await getUsers()
  console.log(tickets)
  return (
    <main className="container mx-auto px-4 py-6">
      <TicketProvider>
        <TicketingDashboard />
      </TicketProvider>
    </main>
  )
}
