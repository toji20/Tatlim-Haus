import React from 'react';
import '@/styles/map.css';

interface Props {
  className?: string;
}

export const Map: React.FC<React.PropsWithChildren<Props>> = () => {
  return (
    <div className="relative" id='Контакты'>
      {/* Заголовок и информационный блок */}
      <div className="map__info-block absolute top-0 left-0 right-0 z-10 p-4">
        <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-md mx-auto items-center">
          <h2 className="map__info-block-title text-2xl font-bold mb-4">Контакты</h2>
          <div className="space-y-3">
            <div>
              <p className="map__info-block-text font-semibold">Адрес:</p>
              <p className='map__info-block-text'>г. Москва, ул. Примерная, д. 123</p>
            </div>
            <div>
              <p className="map__info-block-text font-semibold">Телефон:</p>
              <p className='map__info-block-text'>+7 (123) 456-78-90</p>
            </div>
            <div>
              <p className="map__info-block-text font-semibold">Email:</p>
              <p className='map__info-block-text'>info@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Карта */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577.3253846551745!2d37.583799!3d55.662944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f40.0!3m3!1m2!1s0x0%3A0x0!2zNTXCsDM5JzQ2LjYiTiAzN8KwMzUnMDEuNyJF!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru"
        width="100%"
        height="500"
        loading="lazy"
        className="relative z-0"
      />
    </div>
  );
};