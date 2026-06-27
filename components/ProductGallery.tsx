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
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-[#121419] rounded-2xl flex items-center justify-center p-8 border border-gray-200 dark:border-white/5 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 dark:from-[#121419] via-transparent to-transparent z-10 opacity-60 transition-colors"></div>
        <div className="relative w-full h-full z-0">
          <Image
            src={mainImage}
            alt={productName}
            fill
            className="object-contain drop-shadow-2xl transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {displayImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(imgUrl)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-50 dark:bg-[#121419] ${
                mainImage === imgUrl ? 'border-[#D2B43C] scale-105' : 'border-transparent hover:border-gray-300 dark:hover:border-white/20 opacity-70 hover:opacity-100'
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
