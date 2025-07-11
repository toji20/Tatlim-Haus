'use client'

import React from 'react';
import { ProductCard } from './product-card';
import { Product } from '@prisma/client';
import '@/styles/product.css';
import { ProductModal } from './modals/product-modal';

interface Props {
    title: string;
    items: Product[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductGroupList: React.FC<Props> = ({
    title,
    items,
}) => {
    // Состояние для хранения выбранного продукта
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    const sortedItems = [...items].sort((a, b) => {
        if (a.disabled && !b.disabled) return 1;    
        if (!a.disabled && b.disabled) return -1;   
        return 0;                                   
    });

    return (
        <div className='product-group-container'>
            <h1 className='product-group__title flex justify-center mr-[20%] mb-[34px]'>{title}</h1>
            <div className='product-group__group max-w-[1250px] flex flex-col mb-[50px]' id={title}>
                <div className='product-group__group-product flex flex-wrap gap-x-[15px] gap-y-[40px]'>
                    {sortedItems.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            id={product.id}
                            title={product.name}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            disabled={Boolean(product.disabled)}
                            onClick={() => setSelectedProduct(product)} 
                        />
                    ))}
                </div>
            </div>

            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};