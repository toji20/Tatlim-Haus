import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { Footer } from "@/components/shared/footer";
import { MainBg } from "@/components/shared/main-bg";
import { MainHero } from "@/components/shared/main-hero";
import { Map } from "@/components/shared/map";
import { ProductGroupList } from "@/components/shared/product-group-list";
import { prisma } from "@/prisma/prisma-client";
import '@/styles/filter.css';



export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: true
    }
  })

  return (
    <>
        <MainBg />
      <MainHero categories={categories}/>
      <div className="flex flex-col">
      
        </div>
        <div className=''>
                    <Container className='page-product-container-alpha max-w-[1400px] pt-[40px] pb-[25px] flex items-center'>
                      <div className="page-product-container flex gap-[53px]">
                    <Filters items={categories}/>
                     <div className="flex flex-col">
                     {
                        categories.map((category) => (
                          category.products.length > 0 && (
                            <ProductGroupList 
                              key={category.id}
                              title={category.name} 
                              items={category.products} 
                              categoryId={category.id}/>
                          )
                        ))
                      }
                     </div>
                     </div>
                    </Container>
                    <Map/>
                    <Footer/>
                </div>
            
  </>);
}
