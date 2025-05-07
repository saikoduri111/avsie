
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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const placeholderImagePath = `${basePath}/assets/img/placeholder.jpg`; // Ensure this placeholder exists and is a valid image

  const [selectedImage, setSelectedImage] = useState(placeholderImagePath);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  useEffect(() => {
    if (images && images.length > 0 && images.every(img => typeof img === 'string')) {
      setSelectedImage(images[0]);
      setCurrentImages(images);
    } else {
      setSelectedImage(placeholderImagePath); // Use the basePath-aware placeholder
      setCurrentImages([placeholderImagePath]);
    }
    setIsLoading(true); 
  }, [images, placeholderImagePath]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, isThumbnail = false) => {
    setIsLoading(false);
    if (!isThumbnail && selectedImage !== placeholderImagePath) {
      setSelectedImage(placeholderImagePath);
    }
    // For thumbnails, if one fails, it will show a broken image icon.
    // Optionally, replace broken thumbnail source as well:
    // if (isThumbnail) e.currentTarget.src = placeholderImagePath;
  };
  
  // Determine initial images for the gallery, ensuring placeholder is used if primary images are invalid
  const galleryImages = currentImages.length > 0 && currentImages.every(img => typeof img === 'string') ? currentImages : [placeholderImagePath];
  const mainDisplayImage = (images && images.length > 0 && typeof images[0] === 'string') ? selectedImage : placeholderImagePath;


  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full relative">
             {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse z-0" />
            )}
            <Image
              src={mainDisplayImage}
              alt={`Main image of ${productName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 z-10"
              priority={true} 
              onLoad={handleImageLoad}
              onError={(e) => handleImageError(e, false)}
              data-ai-hint="product image"
            />
          </div>
        </CardContent>
      </Card>
      {galleryImages.length > 1 && ( 
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => { 
                if (selectedImage !== image) { 
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
                  onError={(e) => handleImageError(e, true)}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
