'use client'

import { cn } from "@/lib/utils";
import { FormInput } from "../form-components"
import { FormTextarea } from "../form-components/form-textarea"
import { WhiteBlock } from "../white-block"
import '@/styles/checkout.css';
import { useState } from "react";

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const [deliveryOption, setDeliveryOption] = useState<string>('');

    const handleOptionChange = (option: string) => {
        setDeliveryOption(option);
    };

    // Общая часть формы с инпутами и радиокнопками


    return (
        <>
        <WhiteBlock title="Адрес">
        <div className="addres-form flex flex-col gap-5">            
            <FormInput name="address" placeholder="Адрес доставки" className="text-base"/>
            
            {/* Радиокнопки для выбора способа доставки */}
            <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative w-5 h-5">
                        <input
                            type="radio"
                            name="deliveryOption"
                            checked={deliveryOption === 'courier'}
                            onChange={() => handleOptionChange('courier')}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className={`w-5 h-5 border rounded-full flex items-center justify-center 
                            ${deliveryOption === 'courier' ? 'border-[#D80100]' : 'border-gray-300'}`}>
                            {deliveryOption === 'courier' && (
                                <div className="w-2.5 h-2.5 bg-[#D80100] rounded-full"></div>
                            )}
                        </div>
                    </div>
                    <span className="text-base">Доставка курьером</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative w-5 h-5">
                        <input
                            type="radio"
                            name="deliveryOption"
                            checked={deliveryOption === 'pickup'}
                            onChange={() => handleOptionChange('pickup')}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className={`w-5 h-5 border rounded-full flex items-center justify-center 
                            ${deliveryOption === 'pickup' ? 'border-[#D80100]' : 'border-gray-300'}`}>
                            {deliveryOption === 'pickup' && (
                                <div className="w-2.5 h-2.5 bg-[#D80100] rounded-full"></div>
                            )}
                        </div>
                    </div>
                    <span className="text-base">Самовывоз</span>
                </label>
            </div>
            
            <FormTextarea
                name="comment"
                className="text-base"
                placeholder="Комментарий к заказу"
            />
        </div>
        </WhiteBlock>
        </>
    )
}