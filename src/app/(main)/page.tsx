import { ProductCard } from '@/components/products/product-card';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types/product';
import { Filter, ListFilter } from 'lucide-react';
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


// Simulate fetching products
async function getProducts(): Promise<Product[]> {
  // In a real app, this would be an API call
  return Promise.resolve(mockProducts);
}


export default async function HomePage() {
  const products = await getProducts();

  // Placeholder filter options - in a real app, these would be dynamic
  const filterOptions = {
    fabricTypes: ['Cotton', 'Denim', 'Silk', 'Wool', 'Polyester'],
    colors: ['White', 'Black', 'Navy', 'Blue', 'Red', 'Green', 'Gray', 'Burgundy', 'Cream'],
    moqRanges: ['1-10', '11-50', '51-100', '100+'],
    priceRanges: ['$0-$25', '$26-$50', '$51-$100', '$100+'],
  };


  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Product Catalog</h1>
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
                  {filterOptions.fabricTypes.map((fabric) => (
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
                  {filterOptions.colors.map((color) => (
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
                  {filterOptions.moqRanges.map((range) => (
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
                <h4 className="font-semibold mb-3 text-foreground">Price Range</h4>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={`price-${range}`} />
                      <Label htmlFor={`price-${range}`} className="font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                        {range}
                      </Label>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <Input type="number" placeholder="Min" className="w-1/2"/>
                    <Input type="number" placeholder="Max" className="w-1/2"/>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
