import { CartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
  address: string;
  telephone: string;
  fullname: string;
  comment?: string
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount,items,fullname,address,telephone,comment }) => (
  <div>
    <h1>Заказ #{orderId}</h1>
    <p>Заказчик:{fullname}</p>
    <hr />
    <p>Номер телефона:{telephone}</p>
    <hr />
    <p>Адрес:{address}</p>
    <hr />
    <p>Комментарий:{comment}</p>
    <hr />
    <p>
      Сумма заказа <b>{totalAmount} ₽</b>
      <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
          {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
    </p>
  </div>
);
