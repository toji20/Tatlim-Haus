'use client'

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import React from "react";
import { LoginForm } from "./login-form";
import { Dialog } from "@radix-ui/react-dialog";
import { RegisterForm } from "./register-form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Импортируем иконку крестика

interface Props {
    open: boolean;
    onClose: () => void
}
export const AuthModal: React.FC<Props> = ({open, onClose}) => {
    const [type, setType] = React.useState<"login" | "register">("login");

    const onSwitchType = () => {
        setType(type === "login" ? "register" : "login");
    }
    const handleClose = () => {
        onClose();
    }
    
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="auth__modal w-[450px] bg-white p-10"> {/* Добавил relative для позиционирования крестика */}
                {/* Кнопка закрытия */}
                <button 
                    onClick={handleClose}
                    className="hidden auth__btn-close absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Закрыть</span>
                </button>

                <DialogTitle className="hidden"></DialogTitle>

                {type === "login" ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} onClickLogin={handleClose} />}
                
                <hr />
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
                        GitHub
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img
                            className="w-6 h-6"
                            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                        />
                        Google
                    </Button>
                </div>

                <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
                    {type !== 'login' ? 'Войти' : 'Регистрация'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}