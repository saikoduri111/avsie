'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const PLACEHOLDER_IMAGE = '/assets/img/placeholder.jpg'; // Ensure this placeholder exists

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(PLACEHOLDER_IMAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
      setCurrentImages(images);
    } else {
      setSelectedImage(PLACEHOLDER_IMAGE);
      setCurrentImages([PLACEHOLDER_IMAGE]);
    }
    setIsLoading(true); // Reset loading state when images change
  }, [images]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    // If the selected image fails to load, try to set it to the generic placeholder
    // This also helps if the image path in JSON is incorrect.
    if (selectedImage !== PLACEHOLDER_IMAGE) {
      setSelectedImage(PLACEHOLDER_IMAGE);
    }
    // For thumbnails, if one fails, it will show a broken image icon.
    // We could replace it with a placeholder too, but it might be less informative.
    // e.currentTarget.src = PLACEHOLDER_IMAGE; // Optional: replace broken thumbnail
  };
  
  if (!currentImages || currentImages.length === 0) {
     // This case should ideally be covered by the useEffect setting currentImages to [PLACEHOLDER_IMAGE]
    return (
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full bg-muted flex items-center justify-center">
            <Image
                src={PLACEHOLDER_IMAGE}
                alt={`Placeholder image for ${productName}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint="product placeholder"
              />
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
              <div className="absolute inset-0 bg-muted animate-pulse z-0" />
            )}
            <Image
              src={selectedImage}
              alt={`Main image of ${productName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 z-10"
              priority={true} 
              onLoad={handleImageLoad}
              onError={handleImageError}
              data-ai-hint="product image"
            />
          </div>
        </CardContent>
      </Card>
      {currentImages.length > 1 && ( // Show thumbnails only if there's more than one image (even if it's a placeholder + others)
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => { 
                if (selectedImage !== image) { // Only update if different image
                  setIsLoading(true); 
                  setSelectedImage(image);
                }
              }}
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
                  onError={handleImageError} // Handle errors for thumbnails too
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
