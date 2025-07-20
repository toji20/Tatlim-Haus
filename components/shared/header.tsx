'use client'

import React from "react";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import '@/styles/header.css';
import { CartButton } from "./cart-button";
import Link from "next/link";
import { useSession,signIn } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./auth/forms/auth-modal";
import { usePathname } from "next/navigation"; // Добавьте этот импорт

interface Props {
    className?: string;
}

export const Header = ({ className }: Props) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const pathname = usePathname(); // Получаем текущий путь
    
    // Проверяем, находимся ли мы на странице checkout
    const isCheckoutPage = pathname === '/checkout';
    const isProfilePage = pathname === '/profile';

    return (
        <>
        {!isProfilePage && (
            <div className="alpha-header-container sticky top-5 z-50 w-full py-2 mt-[-120px]">
            <div className="flex justify-center w-full">
                <header className={cn(
                    className,
                    'header-con-alpha flex border max-w-5xl w-full rounded-[14px] bg-white shadow-sm'
                )}>
                    <Container className="header-container flex items-center py-2">
                        <div className="header-con flex items-center gap-20">
                            <div className="flex header-right items-center">
                                <img src="logo.png" alt="Татлым хаус" className="header-logo"/>
                            </div>
                            <div className="flex header-center items-center gap-14 text-xl">
                                <a href="#О нас" className="whitespace-nowrap header-link">
                                    о нас
                                </a>
                                <a href="#Меню" className="whitespace-nowrap header-link">
                                    меню
                                </a>
                                <a href="/" className="whitespace-nowrap header-link">
                                    главная
                                </a>
                                <a href="#Контакты" className="whitespace-nowrap header-link">
                                    контакты
                                </a>
                            </div>
                            <div className="header-btns flex header-left items-center">
                                {/* Условный рендеринг CartButton */}
                                {!isCheckoutPage && !isProfilePage && (
                                    <CartButton className="header-button bg-[#D80100] w-[180px] h-[50px] py-[13px] px-[27px] text-base" />
                                )}

                                
                                {!isProfilePage && (
                                    <div className="header-btns-nocart">
                                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
                                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>
                                    </div>

                                )}
                                    
                            </div>
                        </div>
                    </Container>
                </header>
            </div>
        </div>

        )}
        </>
    );
};