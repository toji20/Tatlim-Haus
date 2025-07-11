'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminFormSchema, AdminFormValues } from './admin-schema';
import { createProduct } from '@/app/api/actions/product';
import toast from "react-hot-toast";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../form-input';

export default function AddProductForm() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter()
    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminFormSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
            price: '',
            categoryId: '',
        },
    });

    const onSubmit = async (data: AdminFormValues) => {
        try {
            setSubmitting(true);
            const result = await createProduct(data);
            
            if (result?.success) {
                toast.success('Товар успешно создан', {
                    icon: '✅',
                });
                form.reset(); // Очищаем форму после успешного создания
                router.refresh(); // Обновляем страницу
            } else {
                toast.error(result?.error || 'Не удалось создать товар', {
                    icon: '❌',
                });
            }
        } catch (err) {
            console.error(err);
            toast.error('Произошла ошибка при создании товара', {
                icon: '❌',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] mx-auto mt-[17px]">
                <h1 className='text-[35px] text-center font-bold mb-[20px] whitespace-nowrap'>Добавление товара</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Название товара
                    </label>
                    <FormInput
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full border border-[#D80100] rounded-[9px]"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block mb-2 font-medium">
                        Фото
                    </label>
                    <FormInput
                        id="imageUrl"
                        name="imageUrl"
                        className="w-full border border-[#D80100] rounded-[9px]"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2 font-medium">
                        Цена
                    </label>
                    <FormInput
                        id="price"
                        name="price"
                        required
                        className="w-full border border-[#D80100] rounded-[9px]"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryId" className="block mb-2 font-medium">
                        Категория
                    </label>
                    <FormInput
                        id="categoryId"
                        name="categoryId"
                        required
                        className="w-full border border-[#D80100] rounded-[9px]"
                    />
                </div>
                
                <div className='flex justify-center'>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 bg-[#D80100] text-white rounded hover:bg-[#D80100]-600 disabled:bg-[#D80100]-300"
                >
                    {submitting ? 'Добавление товара...' : 'Добавить товар'}
                </button>
                </div>
            </form>
        </FormProvider>
    )
}