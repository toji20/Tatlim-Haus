'use client'

import React from 'react';
import { Product } from '@prisma/client';
import '@/styles/product.css';
import { DeleteProductCard } from './delete-card';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { forceDeleteProduct, toggleProductDisabled } from '@/app/api/actions/product';

interface Props {
    title: string;
    items: Product[];
    categoryId: number;
    className?: string;
    listClassName?: string;
    id?: string
}

export const DeleteProductGroupList: React.FC<Props> = ({
    title,
    items,
    id,
    categoryId,
    className,
    listClassName,
}) => {
    const router = useRouter();

    // Сортируем продукты: сначала активные, затем отключенные
    const sortedItems = [...items].sort((a, b) => {
        if (a.disabled && !b.disabled) return 1; // a идет после b
        if (!a.disabled && b.disabled) return -1; // a идет перед b
        return 0; // порядок не меняется
    });

    const handleDelete = async (productId: number) => {
        const confirmation = confirm('Вы уверены, что хотите удалить этот товар?');
        if (!confirmation) return;

        const result = await forceDeleteProduct(productId);
        
        if (result.success) {
            toast.success('Товар успешно удален');
            router.refresh();
        } else {
            toast.error(result.error || 'Ошибка при удалении');
        }
    };

    const handleUpdate = async (productId: number) => {
        const confirmation = confirm('Вы уверены, что хотите изменить статус товара?');
        if (!confirmation) return;

        try {
            const result = await toggleProductDisabled(productId);
            toast.success(`Товар ${result.disabled ? 'скрыт' : 'доступен'}`);
            router.refresh(); // Обновляем страницу для отображения изменений
        } catch (error) {
            toast.error('Ошибка при изменении статуса товара');
            console.error(error);
        }
    };

    return (
        <>
            <h1 className='product-group__title flex justify-center mb-[34px]'>{title}</h1>
            <div className='max-w-[780px] flex flex-col mb-[50px]' id={id}>
                <div className='flex flex-wrap gap-x-[15px] gap-y-[40px]'>
                    {sortedItems.map((product, i) => (
                        <DeleteProductCard
                            key={i} 
                            id={product.id}
                            title={product.name}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            onClickRemove={() => handleDelete(product.id)}
                            onClickDisabled={() => handleUpdate(product.id)}
                            disabled={Boolean(product.disabled)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};