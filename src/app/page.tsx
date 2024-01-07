import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';
import Image from 'next/image';
//it exported on the server

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({ searchParams: { page = '1' } }: HomeProps) {
  const currentPage = parseInt(page);

  const Pagesize = 6;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil(totalItemCount / Pagesize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc',
    },
    skip: (currentPage - 1) * Pagesize,
    take: Pagesize,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(0).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}
