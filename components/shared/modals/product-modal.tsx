'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ProductForm } from '../product-form';
import { useCartStore } from '@/store/cart';

interface Props {
  product: Product | null;
  className?: string;
  onClose: () => void; // Добавляем пропс для закрытия
}

export const ProductModal: React.FC<React.PropsWithChildren<Props>> = ({ className, product, onClose }) => {
    const router = useRouter();  
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);
    const [isOpen, setIsOpen] = useState(Boolean(product));

    useEffect(() => {
        setIsOpen(Boolean(product));
    }, [product]);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
      try {
        const itemId = productItemId ?? product?.id;
        if (!itemId) {
          throw new Error('Product ID is missing');
        }
        await addCartItem({
            productItemId: itemId,
            ingredients,
        });
        setIsOpen(false);
        onClose(); // Сообщаем родителю о закрытии
        router.replace('/',{scroll:false});
      } catch (error) {
        console.error(error);
        setIsOpen(false);
        onClose(); // Закрываем даже при ошибке
      }   
    };

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (!open) {
        onClose(); // Сообщаем родителю о закрытии
        router.replace('/',{scroll:false});
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {product && (
          <DialogContent className={cn(
            'p-0 w-[1060px] rounded-none max-w-[1060px] min-h-[520px] bg-white overflow-hidden',
            className,
          )}>
        <DialogTitle className="hidden"></DialogTitle>
            <ProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              onSubmit={onSubmit}
              loading={loading}
            />
          </DialogContent>
        )}
      </Dialog>
    );
};