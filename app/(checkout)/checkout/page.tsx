'use client';

import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { useCart } from "@/hooks/use-cart";
import { Form, FormProvider, set, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { Api } from "@/services/api-client";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { createOrder } from "@/app/api/actions/order";
import { useSession } from "next-auth/react";
import '@/styles/checkout.css';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";


export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState(false);
    const {updateItemQuantity, items, removeCartItem, loading } = useCart();
    const { totalAmount } = useCart();
    const {data: session} = useSession()  


    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    React.useEffect(() => {
      async function fetchUserInfo() {
        const data = await Api.auth.getMe();
        const [firstName, lastName] = data.fullName.split(' ');
  
        form.setValue('firstName', firstName);
        form.setValue('lastName', lastName);
        form.setValue('email', data.email);
      }
  
      if (session) {
        fetchUserInfo();
      }
    }, [session,form]);
      const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);

            toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
                icon: '✅',
              });
        
              if (url) {
                location.href = url;
              }

        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    };
    
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
      };
    return (
      <>
    <Container className="checkout-cont mt-10">
    <div className="mobile relative hidden">
        <img src="/checkout-mob.png" alt="" className="checkout__mobile-img"/>
        <div className="checkout__img-content">
        <div className="flex items-center">
        <h1 className="checkout__img-content-title">Оформление заказа</h1>
        <Link href="/">
        <Button className="checkout__img-content-btn">
          <ArrowLeft className="checkout__img-content-btn-arrow"/>
          <span className="line"></span>
          <p className="checkout__img-content-btn-text">Вернуться</p>
        </Button></Link>
        </div>
        </div>
        </div>
      <Title text="Оформление заказа" className="desk-title font-extrabold mb-8 text-[36px]" />
        <FormProvider {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
             {/* Левая часть */}
        <div className="sidebar-alpha flex gap-10">
        <div className="input-block flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart 
            items={items} 
            removeCartItem={removeCartItem} 
            onClickCountButton={onClickCountButton}
            className="cart"
            />
            
            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''}/>

        </div>

        {/* Правая часть */}
        <div className="w-[450px] sidebar">
        <CheckoutSidebar 
        totalAmount={totalAmount} 
        loading={loading || submitting}
        className="" />
        </div>
        </div>
           </form>
        </FormProvider>
    </Container>
      
    </>
    )
}
