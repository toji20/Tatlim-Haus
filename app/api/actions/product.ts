// app/actions/product.ts
'use server'

import { AdminFormValues } from '@/components/shared/admin/admin-schema'
import { prisma } from '@/prisma/prisma-client'

export async function createProduct(formData: AdminFormValues) {
  try {
    // Сначала создаем основной продукт
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        imageUrl: formData.imageUrl,
        categoryId: Number(formData.categoryId),
        price: Number(formData.price),
        
      }
    });

    // Затем создаем ProductItem (вариант продукта, который можно добавить в корзину)
    const productItem = await prisma.productItem.create({
      data: {
        price: Number(formData.price),
        productId: product.id, // Связываем с созданным продуктом
      }
    });

    return { 
      success: true, 
      data: { product, productItem } 
    };

  } catch (error) {
    console.error('Create product error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Альтернативный action
export async function forceDeleteProduct(productId: number) {
    try {
      // 1. Удаляем из всех корзин
      await prisma.cartItem.deleteMany({
        where: {
          productItem: {
            productId: productId
          }
        }
      });
  
      // 2. Удаляем варианты товара
      await prisma.productItem.deleteMany({
        where: { productId }
      });
  
      // 3. Удаляем сам товар
      await prisma.product.delete({
        where: { id: productId }
      });
  
      return { success: true };
    } catch (error) {
      console.error('Force delete error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete product' 
      };
    }
  }

export async function toggleProductDisabled(productId: number) {
  try {
    // Получаем текущее состояние продукта
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Продукт не найден");
    }

    // Обновляем disabled на противоположное значение
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        disabled: !product.disabled, // Инвертируем текущее значение
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Ошибка при переключении статуса продукта:", error);
    throw error; // Можно обработать ошибку в вызывающем коде
  }
}