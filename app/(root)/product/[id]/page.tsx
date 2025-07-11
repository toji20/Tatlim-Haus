import { Container } from '@/components/shared/container';
import { ProductForm } from '@/components/shared/product-form';
import { prisma } from '@/prisma/prisma-client';
import { notFound, redirect } from 'next/navigation';
import { useRouter } from 'next/router';

export default async function ProductPage({
    params
  }: {
    params: { id: string }
  }) {
    const product = await prisma.product.findFirst({
        where: { id: Number(params.id) }
      });

  if (!product) {
    return notFound();
  }

  return redirect('/')
}
