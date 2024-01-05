'use client';

import { CartItemWithProduct } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import { startTransition, useTransition } from 'react';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) {
  const [isPending, startTranmission] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i < 100; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className="flex gap-3 items-center">
        <div className="flex flex-wrap items-center ">
          <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" priority />
        </div>
        <div className="flex flex-col">
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                startTransition(() => {
                  setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="items-center flex gap-3">Total: {formatPrice(product.price * quantity)}</div>
          {isPending && <span className="loading loading-spinner loading-sm" />}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
