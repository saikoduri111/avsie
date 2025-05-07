
import { WHATSAPP_PHONE_NUMBER } from '@/lib/mock-data';
import type { Product } from '@/types/product';
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { BulkOrderForm } from '@/components/orders/bulk-order-form';
import { WhatsAppButton } from '@/components/common/whatsapp-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Info, Package, Palette, ShoppingBag, Tag, Truck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import fs from 'fs';
import path from 'path';

interface ProductPageParams {
  sku: string;
}

export async function generateStaticParams() {
  const productsPath = path.join(process.cwd(), 'public/products.json');
  const productsJson = fs.readFileSync(productsPath, 'utf8');
  const products: Product[] = JSON.parse(productsJson);
  
  return products.map(product => ({
    sku: product.sku,
  }));
}

export default async function ProductPage({ params }: { params: ProductPageParams }) {
  const productsPath = path.join(process.cwd(), 'public/products.json');
  const productsJson = fs.readFileSync(productsPath, 'utf8');
  const products: Product[] = JSON.parse(productsJson);
  const product = products.find(p => p.sku === params.sku);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, we couldn't find the product you were looking for.</p>
        <Button asChild>
          <Link href="/">Back to Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Column */}
        <div>
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Details & Order Form Column */}
        <div className="space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                <CardTitle className="text-3xl font-bold text-foreground">{product.name}</CardTitle>
                {product.category && (
                    <Badge variant="secondary" className="text-sm whitespace-nowrap">
                        <ShoppingBag className="w-4 h-4 mr-1.5" />
                        {product.category}
                    </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>SKU: {product.sku}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>
              
              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-1 text-foreground flex items-center"><Info className="h-4 w-4 mr-2 text-primary" />Fabric Details:</h3>
                  <p className="text-muted-foreground">{product.fabricDetails}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground flex items-center"><Truck className="h-4 w-4 mr-2 text-primary" />Lead Time:</h3>
                  <p className="text-muted-foreground">{product.leadTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground flex items-center"><Package className="h-4 w-4 mr-2 text-primary" />Min. Order Quantity:</h3>
                  <p className="text-muted-foreground">{product.minOrderQuantity} units</p>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground flex items-center"><Palette className="h-4 w-4 mr-2 text-primary" />Available Colors:</h3>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.map(color => (
                        <Badge key={color} variant="outline" className="text-xs">{color}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />

              <div>
                <WhatsAppButton
                  phoneNumber={WHATSAPP_PHONE_NUMBER}
                  productSku={product.sku}
                  buttonText="Inquire about this Product"
                  variant="outline"
                  className="w-full"
                />
              </div>

            </CardContent>
          </Card>

          <BulkOrderForm product={product} />
        </div>
      </div>
    </div>
  );
}
