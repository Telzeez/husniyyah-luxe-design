'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createProduct, updateProduct } from '../../../../src/actions/product';

const PREDEFINED_CATEGORIES = [
  "Resin Home decor",
  "Resin Keyholder beauties 😍",
  "Writing and reading materials",
  "Resin Jewelry 🩷",
  "Resin Phone accessories",
  "Souvenirs 🥰",
  "Others"
];

export function ProductForm({ initialData, existingCategories = [] }: { initialData?: any, existingCategories?: string[] }) {
  const router = useRouter();
  const allCategories = Array.from(new Set([...PREDEFINED_CATEGORIES, ...existingCategories]));
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
    if (!isEdit && files.length === 0 && previews.length === 0) {
      setError('Please select at least one image to upload.');
      return;
    }

    startTransition(async () => {
      try {
        let finalImageUrl = initialData?.imageUrl;
        let finalImages = initialData?.images || [];

        // If user selected new files, upload to Vercel Blob
        if (files.length > 0) {
          const uploadFiles = async (force: boolean) => {
            return await Promise.all(
              files.map(async (f) => {
                const response = await fetch(`/api/upload?filename=${f.name}${force ? '&randomSuffix=true' : ''}`, {
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
          };

          try {
            const uploadedUrls = await uploadFiles(false);
            // Append newly uploaded to existing previews that are remote URLs
            const existingUrls = previews.filter(p => p.startsWith('http'));
            finalImages = [...existingUrls, ...uploadedUrls];
            finalImageUrl = finalImages[0] || '';
          } catch (err: any) {
            if (err.message.includes('already exists')) {
              if (window.confirm("An image with this name already exists. Do you want to continue and upload it as a unique file?")) {
                const uploadedUrls = await uploadFiles(true);
                const existingUrls = previews.filter(p => p.startsWith('http'));
                finalImages = [...existingUrls, ...uploadedUrls];
                finalImageUrl = finalImages[0] || '';
              } else {
                throw new Error("Upload cancelled by user.");
              }
            } else {
              throw err;
            }
          }
        } else {
           // No new files, just use the current previews (which would be the remaining existing URLs)
           finalImages = previews.filter(p => p.startsWith('http'));
           finalImageUrl = finalImages[0] || '';
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <input 
                type="text" 
                name="category" 
                list="category-options"
                required 
                defaultValue={initialData?.category || ''}
                className="w-full px-4 py-2 bg-background border border-foreground/20 rounded-md focus:outline-none focus:border-brand-gold text-foreground"
                placeholder="Select or type a new category"
              />
              <datalist id="category-options">
                {allCategories.map((cat, idx) => (
                  <option key={idx} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Product Images <span className="text-foreground/50 text-xs ml-2">(Max 4MB per image)</span>
            </label>
            <div className="border-2 border-dashed border-foreground/20 rounded-lg p-4 flex flex-col items-center justify-center bg-foreground/5 relative min-h-[160px] group">
              {previews.length > 0 ? (
                <div className="w-full h-full p-2 overflow-y-auto z-20">
                  <div className="grid grid-cols-3 gap-3">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-background border border-foreground/10 group/item">
                        <Image src={src} alt={`Preview ${idx + 1}`} fill sizes="33vw" className="object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Remove from previews
                            const newPreviews = [...previews];
                            newPreviews.splice(idx, 1);
                            setPreviews(newPreviews);
                            
                            // If it's a local file (blob:), remove from files too
                            if (src.startsWith('blob:')) {
                              // We need to figure out which file it corresponds to.
                              // Simplest is to just re-match based on remaining blob URLs, or rebuild `files`.
                              // Since we only allow changing all new files at once right now, a precise match is tricky,
                              // but we can just filter out files that don't match the remaining blobs... wait, blob URLs can't be matched back easily.
                              // Better yet: we just recreate files array without this index, assuming files map 1:1 to blob previews (appended at the end).
                              const blobPreviewsCount = previews.filter(p => p.startsWith('blob:')).length;
                              const offset = previews.length - blobPreviewsCount; 
                              if (idx >= offset) {
                                const newFiles = [...files];
                                newFiles.splice(idx - offset, 1);
                                setFiles(newFiles);
                              }
                            }
                          }}
                          className="absolute top-1 right-1 bg-red-500/90 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity z-30 shadow-sm hover:bg-red-600"
                          title="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    {/* Add more button */}
                    <label className="relative aspect-square rounded-md overflow-hidden bg-background border border-foreground/10 border-dashed flex items-center justify-center cursor-pointer hover:bg-foreground/5 transition-colors z-20">
                      <svg className="h-8 w-8 text-foreground/40" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const selectedFiles = Array.from(e.target.files || []);
                          if (selectedFiles.length > 0) {
                            const validFiles = [];
                            let hasLargeFile = false;
                            for (const f of selectedFiles) {
                              if (f.size > 4 * 1024 * 1024) { // 4MB
                                hasLargeFile = true;
                              } else {
                                validFiles.push(f);
                              }
                            }
                            if (hasLargeFile) {
                              setError("One or more images exceed the maximum size of 4MB. Please choose smaller images.");
                            } else {
                              setError("");
                            }
                            
                            if (validFiles.length > 0) {
                              setFiles([...files, ...validFiles]);
                              setPreviews([...previews, ...validFiles.map(f => URL.createObjectURL(f))]);
                            }
                          }
                          // Reset input so the same files can be selected again if needed
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer z-20">
                  <svg className="mx-auto h-12 w-12 text-foreground/40" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-foreground/60">Select image files (multiple allowed)</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files || []);
                      if (selectedFiles.length > 0) {
                        const validFiles = [];
                        let hasLargeFile = false;
                        for (const f of selectedFiles) {
                          if (f.size > 4 * 1024 * 1024) { // 4MB
                            hasLargeFile = true;
                          } else {
                            validFiles.push(f);
                          }
                        }
                        if (hasLargeFile) {
                          setError("One or more images exceed the maximum size of 4MB. Please choose smaller images.");
                        } else {
                          setError("");
                        }
                        
                        if (validFiles.length > 0) {
                          setFiles(validFiles);
                          setPreviews(validFiles.map(f => URL.createObjectURL(f)));
                        }
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              )}
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
