'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || 'https://picsum.photos/600/800');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  if (!images || images.length === 0) {
    return (
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full relative">
             {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={selectedImage}
              alt={`Main image of ${productName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              priority={true} // For LCP
              onLoad={handleImageLoad}
              data-ai-hint="product image"
            />
          </div>
        </CardContent>
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => { setIsLoading(true); setSelectedImage(image);}}
              className={cn(
                'aspect-square rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all',
                selectedImage === image ? 'border-primary shadow-md' : 'border-border hover:border-muted-foreground'
              )}
              aria-label={`View image ${index + 1} of ${productName}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1} of ${productName}`}
                  fill
                  sizes="20vw"
                  className="object-cover"
                  data-ai-hint="thumbnail image"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
