import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received webhook body:", body);

        // Only respond to conversation_created events
        if (body.event !== 'automation_event.conversation_created') {
            return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
        }

        const sender = body.meta?.sender;
        // const firstMessage = body.messages?.[0]?.content || 'New message from Chatwoot';

        if (!sender || !sender.email) {
            return NextResponse.json({ message: 'Missing sender info' }, { status: 400 });
        }

        // Generate Case Number & Message Template

        // 1. Find or create the customer
        let customer = await prisma.customers.findUnique({
            where: { email: sender.email }
        });
        console.log("Customer found:", customer);

        if (!customer) {
            customer = await prisma.customers.create({
                data: {
                    email: sender.email,
                    name: sender.name || 'Unknown',
                    phone: sender.phone_number || null
                }
            });
            console.log("Customer created:", customer);
        }

        // 2. Create a ticket
        const ticket = await prisma.tickets.create({
            data: {
                title: 'New Chatwoot Conversation',
                description: "",
                status: 'NEW',
                priority: 'NORMAL',
                category: 'Chatwoot',
                team: 'Customer Care', // Optional: Match your team logic
                customer_id: customer.id,

            }
        });
        console.log("Ticket created:", ticket);


        // const payload = {}

        return NextResponse.json({ message: 'Ticket created successfully' }, { status: 201 });
    } catch (err) {
        console.error('Webhook error:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
