import { NextResponse } from "next/server";
import prisma from "@/app/lib/Prisma"; // Import the Prisma client instance

export async function GET() {
    try {
         const history = await prisma.chatEntry.findMany({
            orderBy: { createdAt: "desc" },
            take: 20, // Limit to the most recent 20 entries
        });

        return NextResponse.json(history, { status: 200 });
    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}