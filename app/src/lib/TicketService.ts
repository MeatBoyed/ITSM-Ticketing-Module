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

export type TicketDetails = GetTicket & {
    agent: Prisma.usersGetPayload<{}> | null,
    technician: Prisma.usersGetPayload<{}> | null,
}
// export async function getTicket(ticketId: number): Promise<TicketDetails> {
export async function getTicket(ticketId: number) {
    try {
        const ticket = await prisma.tickets.findUnique({
            where: { id: ticketId },
            include: {
                customers: true,
                activities: true,
                users_tickets_assigned_agent_idTousers: true,
                users_tickets_assigned_technician_idTousers: true,
            },
        })
        if (ticket === null) {
            throw new Error("Ticket not found")
        }
        // const agent = await prisma.users.findUnique({
        //     where: { id: ticket?.assigned_agent_id || undefined, role: "AGENT" },
        // })
        // const technician = await prisma.users.findUnique({
        //     where: { id: ticket?.assigned_technician_id || undefined },
        // })
        // return {
        //     ...ticket,
        //     agent: agent || null,
        //     technician: technician || null,
        // }
        return ticket
    } catch (error) {
        throw errorHandler(error)
    }
}

export type GetTicket = (Prisma.ticketsGetPayload<{}> & { customers: Prisma.customersGetPayload<{}>, activities: Prisma.activitiesGetPayload<{}>[], users_tickets_assigned_agent_idTousers: Prisma.usersGetPayload<{}> | null, users_tickets_assigned_technician_idTousers: Prisma.usersGetPayload<{}> | null }) | null
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
    } catch (error) {
        throw errorHandler(error)
    }
}
