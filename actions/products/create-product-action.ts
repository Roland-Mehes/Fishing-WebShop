// 'use server';

// import { redirect } from 'next/navigation';

// import { createProduct } from './createProduct';
// import { createProductSchema } from '@/lib/validation/products/create-product-schema';

// export async function createProductAction(formData: FormData) {
//   const parsed = createProductSchema.safeParse({
//     name: formData.get('name'),
//     brandId: formData.get('brandId'),
//     categoryId: formData.get('categoryId'),
//     sku: formData.get('sku'),
//     ean: formData.get('ean'),
//     price: formData.get('price'),
//     stock: formData.get('stock'),
//   });

//   if (!parsed.success) {
//     throw new Error(parsed.error.issues[0]?.message);
//   }

//   const product = await createProduct(parsed.data);

//   redirect(`/admin/products/${product.id}/edit`);
// }
