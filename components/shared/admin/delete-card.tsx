import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import '@/styles/product.css';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  imageUrl?: string;
  title?: string;
  price?: number;
  id?: number;
  onClickRemove?: () => void;
  onClickDisabled?: () => void;
  disabled: boolean;
  loading?: boolean
}

export const DeleteProductCard: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  imageUrl,
  title,
  price,
  id,
  onClickRemove,
  onClickDisabled,
  disabled,
  loading
}) => {
  return (
    <div className="relative h-[557px]"> {/* Родитель с relative */}
  <div>
    <div className="h-full max-w-[250px]">
      <div className="max-w-[250px] h-[384px] mb-[5px]">
        <img src={imageUrl} alt=""  className='w-[280px] h-[384px]'/>
      </div>
      <h3 className="product-title text-[16px] mb-[7px] w-[280px]">{title}</h3>
      <p className="product-desc text-[12px] mb-[7px] w-[230px]">
        Lorem ipsum dolor sit amet...
      </p>
      <p className='product-price'>{price}₽</p>
    </div>
    
    {/* Кнопки с absolute и прижаты к низу */}
    <div className="absolute bottom-0 left-0 flex items-center flex gap-[5px] max-w-[250px]">
      <Button className='max-w-[112px] text-[13px]' loading={loading} onClick={() => onClickRemove?.()}>Удалить товар</Button>
      <Button className='max-w-[133px] text-[13px]' loading={loading} onClick={() => onClickDisabled?.()}>{!disabled ? 'Убрать из наличия' : 'Вернуть в наличие'}</Button>
    </div>
  </div>
</div>
  );
};