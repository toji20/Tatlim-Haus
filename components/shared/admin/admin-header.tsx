import React from "react";
import { cn } from "@/lib/utils";
import '@/styles/header.css';
import Link from "next/link";
import { Container } from "../container";
import { Button } from "@/components/ui/button";

interface Props {
    className?: string;
}

export const AdminHeader = ({ className }: Props) => {
    return (
        <div className="sticky top-5 z-50 w-full py-2 mt-[-120px]">
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
                            <h1 className="text-[45px] font-bold">Панель администратора</h1>
                            <div className="flex header-left items-center">
                                <Link href="/">
                                    <Button className="px-[25px]">На главную</Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </header>
            </div>
        </div>
    );
};