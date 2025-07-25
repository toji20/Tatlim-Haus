import React, { use } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form-components";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Props {
    onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({onClose}) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues:{
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn('credentials', {
              ...data,
              redirect: false,
            });
      
            if (!resp?.ok) {
              throw Error();
            }
      
            toast.success('Вы успешно вошли в аккаунт', {
              icon: '✅',
            });
      
            onClose?.();
          } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error('Не удалось войти в аккаунт', {
              icon: '❌',
            });
          }
    };

    return (
        <FormProvider {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
        </FormProvider>
    );
};