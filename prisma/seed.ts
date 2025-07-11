import { Prisma } from "@prisma/client";
import { categories, products, productsItem } from "./constant";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";


const generateProductItem = ({
  productId,
  price
}: {
  productId: number;
  price?: number
}) => {
  return {
    productId,
    price,
  } as Prisma.ProductItemUncheckedCreateInput;
};
async function up() {

await prisma.user.createMany({
    data: [
    {
        fullName: "John Doe",
        email: "5oV0R@example.com",
        password: hashSync("12121213", 10),
        verified: new Date(),
        role: "USER"
    },
    {
        fullName: "Bob Smith",
        email: "gM5Qw@example.com",
        password: hashSync("12121213", 10),
        verified: new Date(),
        role: "ADMIN"
    }]
});


await prisma.category.createMany({
  data: categories
})

await prisma.product.createMany({
  data: products
})

await prisma.productItem.createMany({
  data: productsItem
})

await prisma.cart.createMany({
  data: [
    {
      userId: 1,
      totalAmount: 0,
      token: '11111',
    },
    {
      userId: 2,
      totalAmount: 0,
      token: '222222',
    },
  ],
});

await prisma.cartItem.create({
  data: {
    productItemId: 1,
    cartId: 1,
    quantity: 2,
  },
});


}

async function down() {
    
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
        await down();
        await up();
      } catch (e) {
        console.error(e);
      }
}

main().then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });