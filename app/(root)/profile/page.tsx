import { BgAdmin } from "@/components/shared/admin/bg-admin";
import { Container } from "@/components/shared/container";
import { OrderHistory } from "@/components/shared/order-history";
import { ProfileForm } from "@/components/shared/profile-form";
import { ProfileHeader } from "@/components/shared/profile-header";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id),
        }
    });

    if (!user) {
        return redirect('/not-auth');
    }

    // Получаем все заказы пользователя
    const orders = await prisma.order.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc' // Сортировка по дате (новые сначала)
        }
    });

    const hasAdminButton = user.role === 'ADMIN';

    return (
        <div className="">
            <BgAdmin/>
            <Container className="flex p-[100px] pb-[20px] pt-[40px]  justify-between ">
            <div className=" flex-col">
            <ProfileForm data={user} hasAdminButton={hasAdminButton}/>
            </div>
            <OrderHistory orders={orders}/>
        </Container>
        </div>
    )
}