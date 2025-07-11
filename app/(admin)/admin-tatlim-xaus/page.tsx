import { AdminFilters } from "@/components/shared/admin/admin-filter";
import { BgAdmin } from "@/components/shared/admin/bg-admin";
import AddProductForm from "@/components/shared/admin/create-product";
import { DeleteProductGroupList } from "@/components/shared/admin/delete-product-group";
import { Container } from "@/components/shared/container";
import { getUserSession } from "@/lib/get-user-session";
import { notAdmin } from "@/lib/not-admin";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession();
  const user = await prisma.user.findFirst({
         where: {
             id: Number(session?.id),
         }
     });
     if (user?.role === 'USER') {
        return redirect('/not-auth');
     }
     const categories = await prisma.category.findMany({
        include: {
          products: true
        }
      })
 return (
  <>
  <BgAdmin/>
    <Container className="flex">
    <AddProductForm/>
    <div className="flex flex-col mr-[30px]">
    {categories.map((category,index) => (
        category.products.length > 0 && (
        <DeleteProductGroupList
        key={category.id}
        title={`${index + 1 + '.' + category.name}`} 
        id={category.name}
        items={category.products} 
        categoryId={category.id}/>
    )
    ))}
    </div>
    <AdminFilters items={categories}/>
    </Container>
  </>
 )
}
