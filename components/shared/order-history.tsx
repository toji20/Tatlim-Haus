'use client'

import { useState } from 'react';
import { Order } from "@prisma/client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface OrderHistoryProps {
    orders: Order[];
}

const renderOrderItems = (itemsJson: string) => {
    try {
        const items = JSON.parse(itemsJson);
        if (!Array.isArray(items)) return null;

        return items.map((item, index) => {
            if (!item.productItem) return null;
            
            const name = item.productItem.product?.name || 'Неизвестный продукт';
            const price = item.productItem.price || 0;
            const quantity = item.quantity || 1;
            const size = item.productItem.size ?  (`${item.productItem.size} см`) : '';

            return (
                <li key={index} className="flex justify-between">
                    <span>{name} × {quantity}{size}</span>
                    <span>{price * quantity} ₽</span>
                </li>
            );
        });
    } catch (error) {
        console.error('Failed to parse items:', error);
        return <li>Не удалось загрузить состав заказа</li>;
    }
};

export function OrderHistory({ orders }: OrderHistoryProps) {
    const [showAll, setShowAll] = useState(false);
    
    if (!orders || orders.length === 0) {
        return <div className="text-center py-4">У вас пока нет заказов</div>;
    }

    const sortedOrders = [...orders].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const displayedOrders = showAll ? sortedOrders : sortedOrders.slice(0, 4);
    
    return (
        <div className="">
            <h2 className="text-[30px] font-bold mb-[50px]">История заказов</h2>
            
            <Accordion type="single" collapsible className="w-[500px] space-y-2">
                {displayedOrders.map((order, index) => (
                    <AccordionItem key={order.id} value={order.id.toString()} className="border rounded-lg bg-white">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                            <div className="flex justify-between w-full pr-4 bg-white">
                                <span className="font-medium">Заказ #{index + 1}</span>
                                <div className="flex gap-4">
                                    <span className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}
                                    </span>
                                    <span className={`text-sm ${
                                        order.status === 'SUCCEEDED' ? 'text-green-600' : 
                                        order.status === 'CANCELLED' ? 'text-red-600' : 
                                        'text-orange-600'
                                    }`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-4 pb-4 pt-2 bg-white">
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                    <p className="font-semibold">Сумма:</p>
                                        <p>{order.totalAmount} ₽</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Адрес:</p>
                                        <p>{order.address}</p>
                                    </div>
                                    {order.comment && (
                                        <div className="col-span-2">
                                            <p className="font-semibold">Комментарий:</p>
                                            <p>{order.comment}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {order.items && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Состав заказа:</h3>
                                        <ul className="space-y-2">
                                            {renderOrderItems(String(order.items))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {orders.length > 4 && (
                <div className="flex justify-center">
                    <Button 
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                        className="mt-4"
                    >
                        {showAll ? 'Скрыть' : 'Показать все заказы'}
                    </Button>
                </div>
            )}
        </div>
    );
}

function getStatusText(status: string) {
    switch (status) {
        case 'PENDING': return 'В обработке';
        case 'SUCCEEDED': return 'Выполнен';
        case 'CANCELLED': return 'Отменен';
        default: return status;
    }
}