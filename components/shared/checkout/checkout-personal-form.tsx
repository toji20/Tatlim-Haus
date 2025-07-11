import { cn } from "@/lib/utils";
import { FormInput } from "../form-components"
import { WhiteBlock } from "../white-block"
import '@/styles/checkout.css';


interface Props {
    className?: string
}
export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
    return (
        <>
        <WhiteBlock title="Персональные данные" className={cn(className,'')}>
        <div className="personal-form-container grid grid-cols-2 gap-5">
            <FormInput name="firstName" placeholder="Имя" className="text-base firstName" />
            <FormInput name="lastName" placeholder="Фамилия" className="text-base lastName" />
            <FormInput name="email" placeholder="E-mail" className="text-base email" />
            <FormInput name="phone" placeholder="Телефон" className="text-base "/>
        </div>
        </WhiteBlock>
        {/* <div className="phone-block">
            <h2>Номер телефона</h2>
        <FormInput name="phone" placeholder="Телефон" className="text-base phone-mob"/>
        </div> */}
        </>
    )
}