'use client'

import { Category } from '@prisma/client';
import React from 'react';
import '@/styles/filter.css';
import { useCategoryStore } from '@/store/category';


interface Props {
  className?: string;
  items: Category[]
}

export const Filters: React.FC<React.PropsWithChildren<Props>> = ({ items }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
      <>
      <div className='filters-container-desktop w-[200px] mt-[103px] ml-[-40px] pt-[10px] sticky top-0 h-screen overflow-y-auto z-[51]'>
        {
          items.map((item, id) => (
            <a href={`#${item.name}`} key={id} className='block filters-link'>
              <div className='cursor-pointer mb-[6px]'>
                <button className='text-[16px]'>{item.name}</button>
              </div>
            </a>
          ))
        }
      </div>
    
    <div className='filters-container-mobile hidden w-full sticky top-0 z-[51] bg-white py-2 font-light'>
        <div className='flex overflow-x-auto scrollbar-hide space-x-4 px-4'>
          {
            items.map((item, id) => (
              <a href={`#${item.name}`} key={id} className='flex-shrink-0 filters-link'>
                <div className='cursor-pointer'>
                  <button className='filters-link-btn whitespace-nowrap'>{item.name}</button>
                </div>
              </a>
            ))
          }
        </div>
      </div>
      </>
      )
  };
