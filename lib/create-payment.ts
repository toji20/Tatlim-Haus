import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
    amount: number;
    description: string;
    orderId: number;
}

export async function createPayment(details: Props) {
    const { data } = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments',
        {
            amount: {
                value : details.amount.toString(),
                currency: "RUB",
            },
            capture: true,
            description: details.description,
            metadata: {
                odrer_id: details.orderId
            },
            confirmation: {
                type: "redirect",
                return_url: process.env.YOOKASSA_RETURN_URL,
            },
        },
        {
            auth: {
                username: process.env.YOOKASSA_STORE_ID as string,
                password: process.env.YOOKASSA_API_KEY as string,
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            }
        }
    )

    return data;
}