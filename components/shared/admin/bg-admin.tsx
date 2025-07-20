import { cn } from '@/lib/utils';
import React from 'react';
import '@/styles/profile.css';


interface Props {
  className?: string;
}

export const BgAdmin: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className='overflow-hidden max-h-[200px] bg-desk'>
        <img src="https://nmtomxkciwtvymcezhtm.supabase.co/storage/v1/object/public/imgtx//bg-admin.png" alt="Ресторан турецкой кухни" className="w-full max-w-[100%] h-full" />
    </div>
  );
};
