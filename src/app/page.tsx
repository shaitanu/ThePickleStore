import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';
import Image from 'next/image';

//it exported on the server
export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <div className="my-4 grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.slice(0).map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
