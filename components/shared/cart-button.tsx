'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { CartDrawer } from './cart-drawer';
import '@/styles/header.css';


interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <>
      {/* Десктопная версия (скрыта на мобильных) */}
      <div className="cart-desc">
        <CartDrawer>
          <Button className={cn('group relative', className)}>
            <span className='mr-[15px]'>Корзина</span>
            <span className="h-full w-[1px] bg-white/30 mr-[16px]" />
            <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={20} className="relative" strokeWidth={2} />
            </div>
            <ArrowRight
              size={20}
              className="absolute right-7 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Button>
        </CartDrawer>
      </div>

      {/* Мобильная версия (только на экранах до 500px) */}
      <div className="cart-mob hidden fixed bottom-6 right-6 z-50">
        <CartDrawer>
          <Button
            className={cn(
              'rounded-full w-14 h-14 p-0 shadow-lg',
              'bg-[#D80100] hover:bg-[#D80100]/90',
              'flex items-center justify-center'
            )}
          >
            <ShoppingCart size={24} strokeWidth={2} className="text-white" />
          </Button>
        </CartDrawer>
      </div>
    </>
  );
};