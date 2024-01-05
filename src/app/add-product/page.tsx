import FormSubmitButton from '@/components/FormSubmitButton';
import prisma from '@/lib/db/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Add Product',
};

async function addProduct(formData: FormData) {
  'use server';

  const name = formData.get('name')?.toString() as string;
  const description = formData.get('description')?.toString() as string;
  const imageUrl = formData.get('url')?.toString() as string;
  const price = Number(formData.get('price') || 0);

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('/');
}

const Addproductpage = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input required name="name" placeholder="Name" className="input-bordered input mb-3 w-full" />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input required name="url" placeholder="Url" type="url" className="input-bordered input mb-3 w-full" />
        <input required name="price" placeholder="Price" className="input-bordered input mb-3 w-full" />
        <FormSubmitButton className="btn-primary btn-block btn" type="submit">
          Submit
        </FormSubmitButton>
      </form>
    </div>
  );
};
export default Addproductpage;
