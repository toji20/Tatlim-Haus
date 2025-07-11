'use client'

import React from 'react';
import { Container } from './container';
import '@/styles/menu.css';
import { Category } from '@prisma/client';

interface Props {
  className?: string;
  items: Category[]
}

// Добавьте этот хук в ваш компонент
const useScrollAnimation = () => {
   React.useEffect(() => {
     const elements = document.querySelectorAll('.menu__product');
     
     const observer = new IntersectionObserver((entries) => {
       entries.forEach((entry, index) => {
         if (entry.isIntersecting) {
           setTimeout(() => {
             entry.target.classList.add('visible');
           }, index * 100); // Задержка между анимациями
         }
       });
     }, { threshold: 0.2 });
 
     elements.forEach(el => observer.observe(el));
     
     return () => elements.forEach(el => observer.unobserve(el));
   }, []);
 };
 
 // Используйте хук в компоненте

export const Menu: React.FC<React.PropsWithChildren<Props>> = ({items}) => {
   useScrollAnimation()
  return (
    <div className='bg-[#141414]' id='Меню'>

      <div className="relative"> 
      
      </div>
      
        <Container className='menu-container pt-[60px] pb-[65px] pr-[43px] pl-[43px] mx-auto flex flex-col wrap'>
            <div className='menu-top mb-[32px]'>
                  <h1 className='menu-title_menu'>МЕНЮ</h1>
            </div>
            <div className='menu-products flex flex-wrap gap-[40px]'>
                 {
                  items.map((item, id) => (
                     <a href={`#${item.name}`}
                        key={id}
                        className='block'>
                     <div className='menu__product flex items-center justify-center relative cursor-pointer'
                     style={{ backgroundImage: `url(${item.imageUrl})` }}>
                        
                           <button className='menu__product-title absolute text-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{item.name}</button>
                     </div>
                     </a>
                  ))
                 }
            </div>
        </Container>
    </div>
  )
};
