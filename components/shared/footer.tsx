import { cn } from '@/lib/utils';
import React from 'react';
import '@/styles/footer.css';


interface Props {
  className?: string;
}

export const Footer: React.FC<React.PropsWithChildren<Props>> = ({ className }) => {
  return <div className={cn('footer flex justify-center flex-col mx-auto bg-[#1D1C1A]', className)}>
    <div className='footer__container flex justify-center flex-col mx-auto'>
    <img src="/footer-logo.png" alt="" className='footer__logo mb-[10px]'/>
    <div className='flex flex-col mx-auto text-center'>
    <p className='footer__text text-white font-bold'>©2025</p>
    <p className='footer__text text-white font-bold'>TATLIM HAUS</p>
    </div>
    </div>
  </div>;
};
