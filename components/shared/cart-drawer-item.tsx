import { cn } from '@/lib/utils';
import React from 'react';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CircleX, Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  const totalPrice = price * quantity;
  
  return (
    <div
      className={cn(
        'flex bg-white p-3 border-b border-gray-200 items-stretch min-h-[90px]',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      {/* Изображение - фиксированная ширина */}
      <div className="flex-shrink-0 w-[70px] h-[70px] mr-3 flex items-center justify-center">
        <img 
          className="max-w-full max-h-full object-contain" 
          src={imageUrl} 
          alt={name} 
        />
      </div>

      {/* Основное содержимое */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Название и цена за единицу */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-sm line-clamp-2 break-words pr-2">
            {name}
          </h3>
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {price} ₽
          </span>
        </div>

        {/* Детали (если есть) */}
        {details && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">
            {details}
          </p>
        )}

        {/* Управление количеством и общей ценой */}
        <div className="flex items-center justify-between mt-auto">
          <CartItem.CountButton 
            onClick={onClickCountButton} 
            value={quantity} 
          />
          
          <div className="flex items-center gap-3">
            <CartItem.Price 
              value={totalPrice} 
              className="font-medium whitespace-nowrap" 
            />
            <button 
              onClick={onClickRemove}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CircleX size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};