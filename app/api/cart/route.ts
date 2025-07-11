import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { getUserSession } from "@/lib/get-user-session";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = 1;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAlmount: 0 ,items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ]
            },
            include: {
                items: {
                  orderBy: {
                    createdAt: 'desc',
                  },
                  include: {
                    productItem: {
                      include: {
                        product: true,
                      },
                    },
                  },
                  
                },
              },
            });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {

        let token = req.cookies.get('cartToken')?.value;
    
        if (!token) {
          token = crypto.randomUUID();
        }
        const session = await getUserSession();
        const userId = session?.id ? Number(session.id) : null
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId)
          }
        })
        const userCart = await findOrCreateCart(token,Number(user?.id));
    
        const data = (await req.json()) as CreateCartItemValues;
    
        const findCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: userCart.id,
            productItemId: data.productItemId,
            ingredients: {
              every: {
                id: { in: data.ingredients },
              },
            },
          },
        });
    
        // Если товар был найден, делаем +1
        if (findCartItem) {
          await prisma.cartItem.update({
            where: {
              id: findCartItem.id,
            },
            data: {
              quantity: findCartItem.quantity + 1,
            },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cartId: userCart.id,
              productItemId: data.productItemId,
              quantity: 1,
              ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
            },
          });
        }
    
        const updatedUserCart = await updateCartTotalAmount(token);
    
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;
      } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
      }
}