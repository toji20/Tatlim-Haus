import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { OrderSuccessTemplate } from '@/components/shared/email-templates/order-success';
import { sendEmail } from '@/components/shared/send-email';
import { PayOrderTemplate } from '@/components/shared/email-templates/pay-order';
import { notAdmin } from '@/lib/not-admin';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSUCCEEDED = body.object.status === 'SUCCEEDED';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSUCCEEDED ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSUCCEEDED) {
      await sendEmail(
        'Next Pizza / Оплатите заказ #' + order.id,
        PayOrderTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          address: order.address,
          telephone:order.phone,
          comment:order.comment as string,
          fullname: order.fullName as string,
          items
        }),
      );
    } else {
      // Письмо о неуспешной оплате
    }
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
