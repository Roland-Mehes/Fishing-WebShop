'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/storage/get-image';

type ProductImage = {
  id: string;
  imageKey: string | null;
  alt: string | null;
  sortOrder: number;
  isPrimary: boolean;
};

type ProductGalleryProps = {
  images: ProductImage[];
};

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder);

  const primaryImage =
    sortedImages.find((image) => image.isPrimary) ?? sortedImages[0];

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const selectedImage =
    sortedImages.find((image) => image.id === selectedImageId) ?? primaryImage;

  if (!selectedImage) {
    <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted">
      <span className="text-sm text-muted-foreground">
        Nu există imagine pentru acest produs.
      </span>
    </div>;
  }

  const selectedImageUrl = getImageUrl(selectedImage.imageKey);

  if (!selectedImageUrl) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl border bg-muted">
        <span className="text-sm text-muted-foreground">
          Nu există imagine pentru acest produs.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative mx-auto aspect-square w-full max-w-120 overflow-hidden rounded-xl border bg-white">
        <Image
          src={selectedImageUrl}
          alt={selectedImage.alt ?? 'Imagine produs'}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 0 && (
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-6">
          {sortedImages.map((image) => {
            const imageUrl = getImageUrl(image.imageKey);

            if (!imageUrl) {
              return null;
            }

            const isSelected = image.id === selectedImage.id;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImageId(image.id)}
                aria-label={`Alege imaginea ${image.sortOrder + 1}`}
                aria-pressed={isSelected}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-lg border bg-white transition',
                  'hover:border-foreground/50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isSelected
                    ? 'border-foreground ring-2 ring-foreground/20'
                    : 'border-border',
                )}
              >
                <Image
                  src={imageUrl}
                  alt={image.alt ?? 'Imagine produs'}
                  fill
                  sizes="100px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
