'use client'

import React from 'react';
import { Container } from './container';
import { Menu } from './menu';
import { Category } from '@prisma/client';
import '@/styles/hero.css';



interface Props {
  className?: string;
  categories: Category[]
}

export const MainHero: React.FC<React.PropsWithChildren<Props>> = ({ categories }) => {
    const topHeroRef = React.useRef<HTMLDivElement>(null);
    const bottomHeroRef = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1, // Срабатывает когда 10% элемента видно
        }
      );
  
      if (topHeroRef.current) observer.observe(topHeroRef.current);
      if (bottomHeroRef.current) observer.observe(bottomHeroRef.current);
  
      return () => {
        if (topHeroRef.current) observer.unobserve(topHeroRef.current);
        if (bottomHeroRef.current) observer.unobserve(bottomHeroRef.current);
      };
    }, []);
  
    return (
      <div>
          <Container className='hero-con mb-[50px] pr-[43px] pl-[43px]'>
        <div id='О нас' className='bg-white'>
          <div ref={topHeroRef} className='top-hero'>
          <h2 className='top-hero-title top-hero-title-one whitespace-nowrap flex items-center text-[48px] w-[390px]'><hr className='top-hero-line mr-2 bg-[#D80100] w-[290px] h-[3px]'/><span>О нашем</span></h2>
                  <h2 className='top-hero-title top-hero-title-two ml-[230px] text-[48px] mb-[17px]'>Ресторане</h2>
                  <img src="interior.png" alt="#" className='interior-img-top hidden mr-[17px]'/>
                  <p className='top-hero-desc text-[17px] max-w-[819px] ml-[130px]'>МЫ РЕСТОРАН ПРЕКРАСНОЙ ТУРЕЦКОЙ КУХНИ
                  У НАС СОБРАНЫ ВСЕ ТРАДИЦИОННЫЕ БЛЮДА ТУРЕЦКОЙ КУХНИ
                  И НАШЕЙ ЦЕЛЬЮ ЯВЛЯЕТСЯ ЧТОБЫ КАЖДЫЙ ГОСТЬ ОКУНУЛСЯ В АТМОСФЕРУ
                  ТУРЦИИ. НАШ РЕСТОРАН - ЭТО МЕСТО В КОТОРОМ ВЫ МОЖЕТЕ СЕБЯ ПОЧУВСТВОВАТЬ
                  СЕБЯ В ТУРЦИИ
                  </p>
                  <hr className='top-hero-line-two hidden ml-3 bg-[#D80100] w-[100%] h-[3px] mb-4'/>
          </div>
          
          <div ref={bottomHeroRef} className='bottom-hero items-center'>
          <h2 className='bottom-hero-el bottom-hero-el-title whitespace-nowrap flex mb-[17px] text-[48px] items-end'>Интерьер ресторана <hr className='bottom-hero-el-line ml-3 bg-[#D80100] w-[100%] h-[3px] mb-4'/></h2>
                  <div className='flex items-center'>
                  <img src="interior.png" alt="#" className='interior-img bottom-hero-el mr-[17px]'/>
                  <p className='bottom-hero-el text-[17px] max-w-[819px]'>В НАШЕМ РЕСТОРАНЕ ТАТЛЫМ ХАУС 
                  ВАС ЖДЕТ ПРЕКРАСНАЯ ТУРЕЦКАЯ АТМОСФЕРА
                  И У НАС ВЫ ТОЧНО ПОЧУВСТВУЮТЕ СЕБЯ КАК В ТУРЦИИ
                  ТАТЛЫМ ХАУС - ЭТО РЕСТОРАН С ХОРОШИМ ИНТЕРЬЕРОМ И НАСТОЯЩЕЙ
                  ТУРЕЦКОЙ АТМОСВЕРОЙ 
                  </p>
                  </div>
          </div>
        </div>
      </Container>
      <Menu items={categories}/>
      </div>
    );
};

