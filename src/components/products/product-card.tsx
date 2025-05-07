
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shirt } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

const ROOT_RELATIVE_PLACEHOLDER_PATH = '/assets/img/placeholder.jpg';

export function ProductCard({ product }: ProductCardProps) {
  const initialImageSrc = product.images && product.images.length > 0 && product.images[0]
    ? product.images[0] // This is e.g., /assets/img/CCT-001-1.jpg
    : ROOT_RELATIVE_PLACEHOLDER_PATH;

  const [currentImageSrc, setCurrentImageSrc] = useState(initialImageSrc);

  // Update image src if product prop changes or if currentImageSrc was a placeholder and a real image is now available.
  useEffect(() => {
    const newInitialSrc = product.images && product.images.length > 0 && product.images[0]
      ? product.images[0]
      : ROOT_RELATIVE_PLACEHOLDER_PATH;
    
    // Only update if the fundamental src has changed, or if it was a placeholder and might now be a real image
    if (newInitialSrc !== currentImageSrc || currentImageSrc === ROOT_RELATIVE_PLACEHOLDER_PATH) {
       setCurrentImageSrc(newInitialSrc);
    }
  }, [product, currentImageSrc]); // currentImageSrc in dependency to re-evaluate if it was a placeholder

  const handleError = () => {
    // Avoid infinite loop if placeholder itself fails, though unlikely if placeholder is valid
    if (currentImageSrc !== ROOT_RELATIVE_PLACEHOLDER_PATH) {
      setCurrentImageSrc(ROOT_RELATIVE_PLACEHOLDER_PATH);
    }
  };

  const aiHint = product.category ? product.category.toLowerCase() : "clothing";
  const hintWords = aiHint.split(" ").slice(0, 2).join(" ");

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.sku}`} className="block aspect-[4/5] relative w-full overflow-hidden">
          <Image
            key={currentImageSrc} // Add key to help React differentiate if src changes to placeholder
            src={currentImageSrc}
            alt={`Image of ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            data-ai-hint={hintWords}
            onError={handleError}
            unoptimized={true} // Explicitly set, should be picked from config too
          />
           {product.category && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              <Shirt className="w-3 h-3 mr-1.5" />
              {product.category}
            </Badge>
          )}
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1">
          <Link href={`/products/${product.sku}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
        <p className="text-lg font-semibold text-primary">
          From ₹{(product.priceTiers && product.priceTiers.length > 0 && product.priceTiers.sort((a,b) => a.minQuantity - b.minQuantity)[0]?.pricePerUnit || product.price).toFixed(2)}
          <span className="text-xs text-muted-foreground"> /unit</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/products/${product.sku}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
