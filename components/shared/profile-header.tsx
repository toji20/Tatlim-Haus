import React from "react";
import { cn } from "@/lib/utils";
import '@/styles/header.css';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { CartButton } from "./cart-button";

interface Props {
    className?: string;
}

export const ProfileHeader = ({ className }: Props) => {
    return (
        <div className="z-50 w-full py-2 mt-[-180px]">
            <div className="flex justify-center w-full">
                <header className={cn(
         className,
            'flex border max-w-5xl w-full rounded-[14px] bg-white shadow-sm'
                 )}>
        <Container className="flex items-center py-2">
            <div className="flex items-center gap-20">
            <div className="flex header-right items-center">
         <img src="logo.png" alt="Татлым хаус" />
        </div>
        <div className="flex header-center items-center gap-14 text-xl">
        <a href="#О нас" className="whitespace-nowrap header-link">
                           о нас
                     </a>
                     <a href="#Меню" className="whitespace-nowrap header-link">
                    меню
                 </a>
                <a href="" className="whitespace-nowrap header-link">
                главная
                </a>
                <a href="" className="whitespace-nowrap header-link">
                контакты
                </a>
                 </div>
                 <div className="flex header-left items-center">
                        <CartButton className="header-button bg-[#D80100] w-[180px] h-[50px] py-[13px] px-[27px] text-base" />
                                                                     
                      </div>
              </div>
            </Container>
     </header>
            </div>
        </div>
    );
};