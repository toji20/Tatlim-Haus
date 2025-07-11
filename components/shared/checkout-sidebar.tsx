import React from 'react';
import { WhiteBlock } from './white-block';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { CheckoutItemDetails } from './checkout-item-details';

const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  submitting?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, submitting ,className }) => {
  return (
    <>
    <WhiteBlock className={cn('p-6 sticky top-4 sidebar-whiteblock', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalAmount + DELIVERY_PRICE} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
      />

      <Button

        loading={loading || submitting}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
    <Button
        loading={loading || submitting}
        type="submit"
        className="sidebar-btn-mob w-full h-14 rounded-2xl mt-6 hidden text-base font-bold">
        Оплатить за {totalAmount}₽
        <ArrowRight className="w-5 ml-2 sidebar-btn-mob-arrow" />
      </Button>
    </>
  );
};
