import AddToCartButton from '@/app/add-product/AddToCartButton';
import { incrementProductQuantity } from '@/app/add-product/actions';
import PriceTag from '@/components/PriceTag';
import prisma from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

//meta data function not working
export async function generateMetaData({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  const metadataBase = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const metaData = {
    metadataBase: new URL(metadataBase),

    title: product.name + '-Flowmazon',
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
  console.log('Generated MetaData:', metaData);
  return metaData;
  //cache data lene ke liye, prisma use krega toh fir se data fetcch hoga
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image src={product.imageUrl} alt={product.name} width={500} height={500} className="rounded-lg" priority />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  );
}
