import { getUserSession } from "@/lib/get-user-session";
import { notAdmin } from "@/lib/not-admin";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getUserSession();
         const user = await prisma.user.findFirst({
                where: {
                    id: Number(session?.id),
                }
            });
            if (user?.role === 'USER') {
               return redirect('/not-auth');
            }
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.create({
        data
    });
    return NextResponse.json(user);
}