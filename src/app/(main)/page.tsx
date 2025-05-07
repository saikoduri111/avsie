
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types/product';
import { Filter, ListFilter, ShoppingBag, ThumbsUp, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import fs from 'fs';
import path from 'path';


export default async function HomePage() {
  // Read products from JSON file
  const productsPath = path.join(process.cwd(), 'public/products.json');
  const productsJson = fs.readFileSync(productsPath, 'utf8');
  const products: Product[] = JSON.parse(productsJson);

  // Read filter options from JSON file
  const filtersPath = path.join(process.cwd(), 'public/filters.json');
  const filtersJson = fs.readFileSync(filtersPath, 'utf8');
  const filterOptions = JSON.parse(filtersJson);


  return (
    <div>
      {/* Welcome Banner Section */}
      <section className="my-8 text-center bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-border">
        <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
          Welcome to AVSIE Shopping
        </h2>
        <p className="text-base sm:text-lg text-foreground mb-2 max-w-2xl mx-auto">
          Your Trusted Partner for Quality Wholesale Clothing in India.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Discover unbeatable prices on premium fabrics, sourced directly for your business needs. We&apos;re committed to helping you succeed with reliable service and exceptional value.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
                <span>Premium Quality Guaranteed</span>
            </div>
            <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <span>Competitive Wholesale Pricing</span>
            </div>
        </div>
      </section>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Product Catalog</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <ListFilter className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl flex items-center">
                <Filter className="mr-2 h-5 w-5 text-primary" />
                Filter Products
              </SheetTitle>
              <SheetDescription>
                Refine your search by selecting filters.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Fabric Type</h4>
                <div className="space-y-2">
                  {filterOptions.fabricTypes.map((fabric: string) => (
                    <div key={fabric} className="flex items-center space-x-2">
                      <Checkbox id={`fabric-${fabric}`} />
                      <Label htmlFor={`fabric-${fabric}`} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {fabric}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <hr/>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Color</h4>
                <div className="space-y-2">
                  {filterOptions.colors.map((color: string) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox id={`color-${color}`} />
                      <Label htmlFor={`color-${color}`} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <hr/>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">MOQ Range</h4>
                <div className="space-y-2">
                  {filterOptions.moqRanges.map((range: string) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`moq-${range}`} />
                      <Label htmlFor={`moq-${range}`} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {range}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <hr/>
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Price Range (₹)</h4>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range: string) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`price-${range}`} />
                      <Label htmlFor={`price-${range}`} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {range}
                      </Label>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Input type="number" placeholder="Min (₹)" className="w-1/2"/>
                    <Input type="number" placeholder="Max (₹)" className="w-1/2"/>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg py-12">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

