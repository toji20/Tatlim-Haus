import { BgAdmin } from "@/components/shared/admin/bg-admin";
import { Container } from "@/components/shared/container";
import { OrderHistory } from "@/components/shared/order-history";
import { ProfileForm } from "@/components/shared/profile-form";
import { ProfileHeader } from "@/components/shared/profile-header";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import '@/styles/profile.css';

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

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const hasAdminButton = user.role === 'ADMIN';

    return (
        <div className="profile-page">
            <BgAdmin className="bg-desk"/>
            <div className="mobile relative hidden">
                <img src="/checkout-mob.png" alt="" className="profile__mobile-img"/>
                <div className="profile__img-content">
                    {/* Кнопка "Профиль" справа сверху */}
                    <div className="w-full flex justify-start mb-4">
                        <h1 className="profile__title">
                            Профиль
                        </h1>
                    </div>
                    
                    {/* Блок с информацией пользователя */}
                    <div className="profile__user-block flex items-center gap-4 mb-6">
                        <div className="profile__user-avatar">
                            {/* Замените на реальное изображение пользователя */}
                            <img 
                                src={"/profile-img.png"} 
                                alt="Аватар" 
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="profile__user-info">
                            <h2 className="profile__user-name">{user.fullName || 'Пользователь'}</h2>
                            <p className="profile__user-phone">{'Телефон не указан'}</p>
                            <p className="profile__user-email">{user.email}</p>
                            {hasAdminButton && (
                            <Link href="/admin-tatlim-xaus">
                            <Button>Администратор</Button>
                            </Link>
                            )}
                        </div>
                    </div>
                    <div className="profile__back flex items-center">
                        <Link href="/">
                            <Button className="profile__img-content-btn">
                                <ArrowLeft className="profile__img-content-btn-arrow"/>
                                <span className="line"></span>
                                <p className="profile__img-content-btn-text">Вернуться</p>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Container className="container-beta flex p-[100px] pb-[20px] pt-[40px] justify-between">
                <div className="flex-col">
                    <ProfileForm data={user} hasAdminButton={hasAdminButton} className='profile-form'/>
                </div>
                <OrderHistory orders={orders}/>
            </Container>
        </div>
    )
}