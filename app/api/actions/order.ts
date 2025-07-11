'use server'

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { PayOrderTemplate } from "@/components/shared/email-templates/pay-order";
import { sendEmail } from "@/components/shared/send-email";
import { createPayment } from "@/lib/create-payment";
import { getUserSession } from "@/lib/get-user-session";
import { notAdmin } from "@/lib/not-admin";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createOrder(data: CheckoutFormValues) {
    const DELIVERY_PRICE = 250;
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;
    
        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        // Находим корзину по токену
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true, // Включаем пользователя
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const session = await getUserSession();
        const userId = session?.id ? Number(session.id) : null

        // Создаем заказ и привязываем к пользователю, если он есть
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount + DELIVERY_PRICE,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
                // Привязываем заказ к пользователю, если корзина принадлежит пользователю
                userId: userId || userCart.userId || null, // Если userId есть - привязываем, если нет - оставляем null
            },
        });

        // Остальной код остается без изменений...
        //   очищаем корзину
          await prisma.cart.update({
            where: {
              id: userCart.id,
            },
            data: {
              totalAmount: 0,
            },
          })

          await prisma.cartItem.deleteMany({
            where: {
              cartId: userCart.id,
            },
          });

          const paymentData = await createPayment({ 
            amount: order.totalAmount,  
            orderId: order.id,
            description: `Татлым Хаус / Оплата заказа #${order.id}`, 
          });

          if (!paymentData) {
            throw new Error('Payment data not found');
          }

          await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              paymentId: paymentData.id,
            },
          });

          const paymentUrl = paymentData.confirmation.confirmation_url;

          return paymentUrl
        } catch (error) {
            console.log(error)
        }
    }