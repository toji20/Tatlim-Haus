'use client'

import { ProductModal } from "@/components/shared/modals/product-modal";
import { Product } from "@prisma/client";
import { useState } from "react";

interface ProductModalWrapperProps {
  initialProduct: Product;
}

export function ProductModalClient({ initialProduct }: ProductModalWrapperProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ProductModal 
      product={selectedProduct}
      onClose={() => {
        setSelectedProduct(null); // Дополнительно закрываем модалку через роутер
      }}
    />
  );
}