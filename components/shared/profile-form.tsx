'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { Container } from "./container";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { FormInput } from "./form-components";
import { Title } from "./title";
import { FormRegisterSchema, TFormRegisterValues } from "./auth/forms/schemas";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateUserInfo } from "@/app/api/actions/user";

interface Props {
    data: User;
    hasAdminButton: any;
  }

export const ProfileForm: React.FC<Props> = ({data,hasAdminButton}) => {
    const form = useForm({
        resolver: zodResolver(FormRegisterSchema),
        defaultValues: {
          fullName: data.fullName,
          email: data.email,
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = async (data: TFormRegisterValues) => {
        try {
          await updateUserInfo({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
          });
    
          toast.error('Данные обновлены 📝', {
            icon: '✅',
          });
        } catch (error) {
          return toast.error('Ошибка при обновлении данных', {
            icon: '❌',
          });
        }
      };

      const onClickSignOut = () => {
        signOut({
          callbackUrl: '/',
        });
      };
    return (
        <Container className="flex">
            <div className="flex-col">
            <Title text={`Личные данные`} size="md" className="font-bold" />
            <FormProvider {...form}>
            <form className="flex flex-col gap-5 w-96 mt-[25px]" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Полное имя" required />

                <FormInput type="password" name="password" label="Новый пароль" required />
                <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                <Button disabled={form.formState.isSubmitting} className="text-base mt-3" type="submit">
                Сохранить
                </Button>

                <Button
                onClick={onClickSignOut}
                variant="secondary"
                disabled={form.formState.isSubmitting}
                className="text-base bg-white"
                type="button">
                Выйти
                </Button>
                {hasAdminButton && (
              <Link href="/admin-tatlim-xaus">
              <Button>Администратор</Button>
            </Link>
            )}
            </form>
            </FormProvider>
            </div>
            
        </Container>
    );
};