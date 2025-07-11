import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import '@/styles/product.css';
import { DisabledProps } from '@/lib/disabledProps';

interface Props extends DisabledProps {
  className?: string;
  imageUrl?: string;
  title?: string;
  price?: number;
  id?: number;
  onClick?: () => void;
}

export const ProductCard: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  imageUrl,
  title,
  price,
  id,
  disabled,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "product-card",
        disabled && "disabled",
        className
      )}
      onClick={onClick}
    >
      <Link href={`/product/${id}`}>
        <div className="h-full">
          <div className="product-image-container">
            <img 
              src={imageUrl} 
              alt={title} 
              className="product-image"
            />
          </div>
          <h3 className="product-title">{title}</h3>
          <p className="product-desc">
            Lorem ipsum dolor sit amet...
          </p>
          <p className="product-price">{price}₽</p>
        </div>
        
        <div className="product-buttons">
          <button className="product-button">
            Подробнее
          </button>
          <button className="product-button__cart">
            Добавить в корзину
          </button>
        </div>
      </Link>
    </div>
  );
};