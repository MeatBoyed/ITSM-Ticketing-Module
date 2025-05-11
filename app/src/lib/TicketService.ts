"use server"
import prisma from "@/lib/prisma"
import { errorHandler } from "@/lib/errors"
import { Prisma } from "@/generated/prisma"

// Form uses Schema to already validate input
// export async function createTicket(ticket: TicketForm) {
//     try {
//         await prisma?.tickets.create({
//             data: {
//                 date: ticket.date,
//                 name: ticket.name,
//                 address: ticket.address,
//                 phone: ticket.phone,
//                 router_serial_no: ticket.router_serial_no,
//                 router_mac: ticket.router_mac,
//                 network: ticket.network,
//                 client_online: ticket.client_online,
//                 monthly_revenue: ticket.monthly_revenue,
//                 notes: ticket.notes || "",
//                 created_at: new Date(),
//                 updated_at: new Date(),
//             }
//         })
//     } catch (error) {
//         throw errorHandler(error)
//     }
// }

// export async function updateTicket(ticket: TicketForm, ticketId: string) {
//     try {
//         await prisma.tickets.update({
//             where: { id: ticketId },
//             data: {
//                 date: ticket.date,
//                 name: ticket.name,
//                 address: ticket.address,
//                 phone: ticket.phone,
//                 router_serial_no: ticket.router_serial_no,
//                 router_mac: ticket.router_mac,
//                 network: ticket.network,
//                 client_online: ticket.client_online,
//                 monthly_revenue: ticket.monthly_revenue,
//                 notes: ticket.notes || "",
//                 updated_at: new Date(),
//             }
//         })

//     } catch (error) {
//         throw errorHandler(error)
//     }
// }

// export async function deleteTicket(ticketId: string) {
//     try {
//         await prisma?.tickets.delete({ where: { id: ticketId } })
//     } catch (error) {
//         throw errorHandler(error)
//     }
// }
// export async function getTicket(ticketId: string) {
//     try {
//         const ticketRaw = await prisma?.tickets.findFirstOrThrow({ where: { id: ticketId } })
//         // const ticket: Ticket = {
//         //     ...ticketRaw,
//         //     client_online: ticketRaw.client_online as "Online" | "Offline",
//         //     monthly_revenue: Number(ticketRaw.monthly_revenue)
//         // }
//         return ticketRaw
//     } catch (error) {
//         throw errorHandler(error)
//     }
// }
export type GetTicket = (Prisma.ticketsGetPayload<{}> & { customers: Prisma.customersGetPayload<{}>, activities: Prisma.activitiesGetPayload<{}>[] })
export async function getTickets(): Promise<GetTicket[]> {
    try {
        return await prisma?.tickets.findMany({
            orderBy: { created_at: "desc" },
            include: {
                customers: true,
                activities: true,
                users_tickets_assigned_agent_idTousers: true,
                users_tickets_assigned_technician_idTousers: true,
            }
        })
        // return tickets
    } catch (error) {
        throw errorHandler(error)
    }
}
