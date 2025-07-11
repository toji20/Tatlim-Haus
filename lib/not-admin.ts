import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "./get-user-session";
import { redirect } from "next/navigation";

export async function notAdmin() {
    const session = await getUserSession();
     const user = await prisma.user.findFirst({
            where: {
                id: Number(session?.id),
            }
        });
        if (user?.role === 'USER') {
           return redirect('/not-auth');
        }
}