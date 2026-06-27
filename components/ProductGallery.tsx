'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  productName: string;
  initialImageUrl: string;
  images: string[];
}

export default function ProductGallery({ productName, initialImageUrl, images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(initialImageUrl);

  // If there are no extra images, or just one that is the same as the main image, use a single image
  const displayImages = images && images.length > 0 ? images : [initialImageUrl];

  return (
    <div className="md:w-1/2 flex flex-col space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-foreground/5 rounded-2xl flex items-center justify-center p-8 border border-foreground/10 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent z-10 opacity-60 transition-colors"></div>
        <div className="relative w-full h-full z-0">
          {displayImages.map((imgUrl, idx) => (
            <Image
              key={idx}
              src={imgUrl}
              alt={`${productName} view ${idx + 1}`}
              fill
              className={`object-contain drop-shadow-2xl transition-opacity duration-300 ${mainImage === imgUrl ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {displayImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(imgUrl)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-foreground/5 ${
                mainImage === imgUrl ? 'border-brand-gold scale-105' : 'border-transparent hover:border-foreground/30 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${productName} view ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
