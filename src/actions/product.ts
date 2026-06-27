'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
import { products } from '../db/schema';
import { revalidatePath } from 'next/cache';

export async function createProduct(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priceString = formData.get('price') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const imagesStr = formData.get('images') as string;

  if (!name || !description || !priceString || !imageUrl) {
    return { error: 'Please fill out all fields and upload an image.' };
  }

  let images = [];
  try {
    if (imagesStr) images = JSON.parse(imagesStr);
  } catch(e) {}

  const price = Math.round(parseFloat(priceString) * 100); // convert to cents

  try {
    await db.insert(products).values({
      name,
      description,
      price,
      imageUrl,
      images,
    });
    
    revalidatePath('/admin/products');
    revalidatePath('/product');
    revalidatePath('/');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { error: 'Failed to create product in database.' };
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/admin/products');
    revalidatePath('/product');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error: 'Failed to delete product.' };
  }
}

export async function updateProduct(id: number, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priceString = formData.get('price') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const imagesStr = formData.get('images') as string;

  if (!name || !description || !priceString || !imageUrl) {
    return { error: 'Please fill out all fields and ensure image is uploaded.' };
  }

  let images = [];
  try {
    if (imagesStr) images = JSON.parse(imagesStr);
  } catch(e) {}

  const price = Math.round(parseFloat(priceString) * 100);

  try {
    await db.update(products)
      .set({ name, description, price, imageUrl, images })
      .where(eq(products.id, id));
      
    revalidatePath('/admin/products');
    revalidatePath('/product');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: 'Failed to update product.' };
  }
}
