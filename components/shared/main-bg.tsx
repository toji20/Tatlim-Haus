import React from 'react';
import { Button } from '../ui/button';
import '@/styles/main-bg.css';

interface Props {
  className?: string;
}

export const MainBg: React.FC<React.PropsWithChildren<Props>> = ({}) => {
  return (
    <main className="main-bg">
      <img src="main.png" alt="Ресторан турецкой кухни" className='main'/>
      <img src="main-mob.png" alt="Ресторан турецкой кухни" className='main-mob hidden'/>
      <div className="main-content">
        <h1 className="main-title">
          РЕСТОРАН ТУРЕЦКОЙ КУХНИ
        </h1>
        <Button className="main-button">
          <a href="#Контакты">ЗАБРОНИРОВАТЬ СТОЛ</a>
        </Button>
      </div>
    </main>
  );
};