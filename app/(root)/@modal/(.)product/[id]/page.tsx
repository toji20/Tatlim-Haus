import { ProductModalClient } from "@/components/shared/modals/product-modal-client";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
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

  return <ProductModalClient initialProduct={product} />;
}