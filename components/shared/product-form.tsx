'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";
import '@/styles/product-modal.css';


interface Props {
    imageUrl: string;
    name: string;
    price: number;
    loading?: boolean;
    className?: string;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
    imageUrl,
    name,
    price,
    className,
    onSubmit,
    loading
}) => {

    return (
        <div className={cn('product-modal-cont flex flex-1',className)}>
            <div className="product-modal-cont-one flex items-center justify-center flex-1 relative w-full">
                <img src={imageUrl} 
                alt={name}
                className="relative left-2 top-2 transition-all z-10 duration-300 w-[450px] h-[450px] product-modal-img"
                />
            </div>

            <div className="product-modal-cont-two w-[490px] bg-white p-7 flex flex-col">
                <Title text={name} size="lg" className="font-extrabold mb-1 product-modal-title"/>
                <p className="text-[20px] mb-[10px] product-modal-desc">граммовка: 200гр</p>
                <h3 className="text-[36px] mb-[18px] product-modal-price">{price}₽</h3>
                <div className="reverse">
                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-[65px] px-10 text-base rounded-[18px] w-[270px] rounded-none mb-[31px] product-modal-btn">
                        Добавить в корзину
                    </Button>
                    <div>
                    <p className="text-[24px] product-modal-ingredients">Состав:</p>
                    <p className="text-[16px] product-modal-ingredients-desc">говядина, острый перец на тонком тесте</p>
                    </div>
                </div>
            </div>
        </div>
    )
}