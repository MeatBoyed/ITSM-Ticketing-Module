import prisma from "./prisma";

export async function getUsers() {
    return await prisma.users.findMany();
}

export async function getTickets() {
    return await prisma.tickets.findMany();
}