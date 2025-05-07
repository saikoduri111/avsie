
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ROOT_RELATIVE_PLACEHOLDER_PATH_GALLERY = '/assets/img/placeholder.jpg';

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  // Determine initial valid images or use placeholder
  const getValidInitialImages = (imgArray: string[] | undefined) => {
    if (imgArray && imgArray.length > 0 && imgArray.every(img => typeof img === 'string')) {
      return imgArray;
    }
    return [ROOT_RELATIVE_PLACEHOLDER_PATH_GALLERY];
  };

  const [galleryDisplayImages, setGalleryDisplayImages] = useState<string[]>(getValidInitialImages(images));
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>(galleryDisplayImages[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newValidImages = getValidInitialImages(images);
    setGalleryDisplayImages(newValidImages);
    setSelectedImageSrc(newValidImages[0]);
    setIsLoading(true); // Assume new image will load
  }, [images]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleMainImageError = () => {
    if (selectedImageSrc !== ROOT_RELATIVE_PLACEHOLDER_PATH_GALLERY) {
      setSelectedImageSrc(ROOT_RELATIVE_PLACEHOLDER_PATH_GALLERY);
    }
    setIsLoading(false);
  };
  
  // Optional: Handler for thumbnail errors, can replace src or let browser show broken image
  // const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  //   (e.target as HTMLImageElement).src = ROOT_RELATIVE_PLACEHOLDER_PATH_GALLERY;
  // };

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full relative">
             {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse z-0" />
            )}
            <Image
              key={selectedImageSrc} // Force re-render on src change, helpful for error fallback
              src={selectedImageSrc}
              alt={`Main image of ${productName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 z-10"
              priority={true}
              onLoad={handleImageLoad}
              onError={handleMainImageError}
              unoptimized={true}
              data-ai-hint="product image"
            />
          </div>
        </CardContent>
      </Card>
      {galleryDisplayImages.length > 1 && ( // Only show thumbnails if more than one image (or if the single image isn't the placeholder)
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {galleryDisplayImages.map((imageSrc, index) => (
            <button
              key={index}
              onClick={() => {
                if (selectedImageSrc !== imageSrc) {
                  setIsLoading(true);
                  setSelectedImageSrc(imageSrc);
                }
              }}
              className={cn(
                'aspect-square rounded-md overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all',
                selectedImageSrc === imageSrc ? 'border-primary shadow-md' : 'border-border hover:border-muted-foreground'
              )}
              aria-label={`View image ${index + 1} of ${productName}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc}
                  alt={`Thumbnail ${index + 1} of ${productName}`}
                  fill
                  sizes="20vw"
                  className="object-cover"
                  data-ai-hint="thumbnail image"
                  unoptimized={true}
                  // onError={handleThumbnailError} // Uncomment to handle thumbnail errors
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
