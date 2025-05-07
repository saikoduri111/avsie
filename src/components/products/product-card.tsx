import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shirt } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const displayImage = product.images[0] || 'https://picsum.photos/400/500';
  const aiHint = product.category ? product.category.toLowerCase() + " clothing" : "clothing apparel";


  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.sku}`} className="block aspect-[4/5] relative w-full overflow-hidden">
          <Image
            src={displayImage}
            alt={`Image of ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            data-ai-hint={aiHint}
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
          From ${product.priceTiers[0]?.pricePerUnit.toFixed(2) || product.price.toFixed(2)}
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
