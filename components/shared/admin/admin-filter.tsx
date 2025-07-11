'use client'

import { Category } from '@prisma/client';
import React from 'react';
import '@/styles/filter.css';
import { useCategoryStore } from '@/store/category';


interface Props {
  className?: string;
  items: Category[]
}

export const AdminFilters: React.FC<React.PropsWithChildren<Props>> = ({ items }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
      <div className='mt-[103px] pt-[10px] sticky top-0 h-screen overflow-y-auto z-[51]'>
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
    )
  };