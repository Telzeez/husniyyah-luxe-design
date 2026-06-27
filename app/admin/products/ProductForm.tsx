'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createProduct, updateProduct } from '../../../src/actions/product';

export function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(
    initialData?.images?.length > 0 ? initialData.images : (initialData?.imageUrl ? [initialData.imageUrl] : [])
  );
  const [error, setError] = useState('');

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget);
    
    // Validate image presence
    if (!isEdit && files.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    startTransition(async () => {
      try {
        let finalImageUrl = initialData?.imageUrl;
        let finalImages = initialData?.images || [];

        // If user selected new files, upload to Vercel Blob
        if (files.length > 0) {
          const uploadedUrls = await Promise.all(
            files.map(async (f) => {
              const response = await fetch(`/api/upload?filename=${f.name}`, {
                method: 'POST',
                body: f,
              });

              if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(`Failed to upload image: ${errBody.error || response.statusText || 'Unknown error'}`);
              }

              const blob = await response.json();
              return blob.url;
            })
          );

          finalImageUrl = uploadedUrls[0];
          finalImages = uploadedUrls;
        }

        // Add the image URLs to our formData for the Server Action
        formData.append('imageUrl', finalImageUrl || '');
        formData.append('images', JSON.stringify(finalImages));

        let result;
        if (isEdit) {
          result = await updateProduct(initialData.id, null, formData);
        } else {
          result = await createProduct(null, formData);
        }

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/admin/products');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred.');
      }
    });
  };

  return (
    <div className="bg-background rounded-xl border border-foreground/10 shadow-sm overflow-hidden max-w-3xl">
      <div className="px-6 py-4 border-b border-foreground/10 bg-foreground/5">
        <h3 className="font-semibold text-foreground">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                defaultValue={initialData?.name}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-brand-gold text-foreground"
                placeholder="e.g. Luxury Handmade Wallet"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Price (₦ Naira)</label>
              <input 
                type="number" 
                name="price" 
                step="0.01" 
                min="0"
                required 
                defaultValue={initialData ? (initialData.price / 100).toFixed(2) : ''}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-brand-gold text-foreground"
                placeholder="e.g. 15000"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground mb-1">Product Images</label>
            <div className="border-2 border-dashed border-foreground/20 rounded-lg p-4 flex flex-col items-center justify-center bg-foreground/5 relative min-h-[160px] group">
              {previews.length > 0 ? (
                <div className="absolute inset-0 w-full h-full p-2 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-background border border-foreground/10">
                        <Image src={src} alt={`Preview ${idx + 1}`} fill sizes="33vw" className="object-contain" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/80 transition-opacity">
                     <span className="text-sm font-bold text-foreground">Click to change all images</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-foreground/40" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-foreground/60">Select image files (multiple allowed)</p>
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  if (selectedFiles.length > 0) {
                    setFiles(selectedFiles);
                    setPreviews(selectedFiles.map(f => URL.createObjectURL(f)));
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4}
            defaultValue={initialData?.description}
            className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-brand-gold text-foreground resize-none"
            placeholder="Detailed description of the handmade item..."
          ></textarea>
        </div>

        <div className="pt-4 border-t border-foreground/10 flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            disabled={isPending}
            className="px-6 py-2 border border-foreground/20 rounded-md text-foreground font-medium hover:bg-foreground/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isPending}
            className="px-6 py-2 bg-brand-gold text-background rounded-md font-medium hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
