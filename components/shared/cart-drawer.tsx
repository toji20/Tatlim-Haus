'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { DialogTitle } from '../ui/dialog';
import { useCartStore } from '@/store/cart';
import { CartDrawerItem } from './cart-drawer-item';
import { useCart } from '@/hooks/use-cart';
import '@/styles/cart.css';


interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const [redirecting, setRedirecting] = React.useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
      };
    return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="bottom" className="flex flex-col pb-0 bg-[white] max-w-[550px] mx-auto left-0 right-0">
        <DialogTitle className="hidden"></DialogTitle>
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>    
            {totalAmount > 0 && (
              <SheetHeader className=' mb-[15px]'>
              <SheetTitle className='font-medium'>
                В корзине <span className="font-medium">{items.length} товара</span>
              </SheetTitle>
            </SheetHeader>
            )}

          {!totalAmount && (
            <div className="cart-list flex flex-col items-center justify-center w-72 h-[500px] mx-auto">
              <img src="cart-empty.png" alt="#" className='w-[150px] mb-[20px]'/>
              <h1 className="text-center text-2xl font-bold my-2">
                Корзина пустая
              </h1>
              <p className="text-center text-neutral-500 mb-5">
              Корзина пустая, добавьте
              хотя бы один товар
               </p>

              <SheetClose>
              <Button
                    type="submit"
                    className="max-w-[400px] px-[40px] py-[20px] rounded-none text-[#D80100] h-16 text-base bg-white border border-[#D80100]">
                    Вернуться назад 
                  </Button>
              </SheetClose>
            </div>
          )}
            
            {totalAmount > 0 && (
              <>
                          <hr className='cart-empty-line border-black border-1'/>

              <div className="cart-list scrollbar overflow-auto h-[400px]">
              {
                items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    details=''
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                  />
                ))
              }
            </div>
            

            <SheetFooter className="cart-footer -mx-6 bg-white p-7 pt-[1px]">
              <div className="w-full ">
              <hr className='h-[1px] bg-[#2B2823] border-0 mb-[20px] cart-empty-line'/>
                <div className="flex mb-[20px] items-end justify-end">
                  <span className="font-bold flex text-[20px]  mr-2">
                    Сумма заказа: 
                  </span>

                  <span className="font-l text-lg">{totalAmount}₽</span>
                </div>

                <div className='flex justify-center'>
                <Link href="/checkout">
                  <Button
                   onClick={() => setRedirecting(true)}
                   loading={redirecting}
                    type="submit"
                    className="max-w-[400px] px-[40px] py-[20px] rounded-none text-[#D80100] h-16 text-base bg-white border border-[#D80100]">
                     Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
                </div>
              </div>
            </SheetFooter>
            </>
            )}
              </div>
      </SheetContent>
    </Sheet>
  );
};
