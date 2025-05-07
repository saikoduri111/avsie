'use client';

import type { Product, PriceTier } from '@/types/product';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/mock-data';
import { WhatsAppButton } from '@/components/common/whatsapp-button';
import { AlertCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkOrderFormProps {
  product: Product;
}

export function BulkOrderForm({ product }: BulkOrderFormProps) {
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [perUnitCost, setPerUnitCost] = useState(product.price);
  const [totalPrice, setTotalPrice] = useState(0);
  const { toast } = useToast();

  const calculateCosts = useCallback(() => {
    let currentPerUnitCost = product.price;
    if (product.priceTiers && product.priceTiers.length > 0) {
      const sortedTiers = [...product.priceTiers].sort((a, b) => b.minQuantity - a.minQuantity);
      const applicableTier = sortedTiers.find(tier => quantity >= tier.minQuantity);
      if (applicableTier) {
        currentPerUnitCost = applicableTier.pricePerUnit;
      } else if (product.priceTiers[0] && quantity < product.priceTiers[0].minQuantity && quantity >= product.minOrderQuantity) {
        // If quantity is below the first tier but meets MOQ, use the first tier's price or base price if more appropriate.
        // For simplicity, let's assume the first tier is the base or slightly above MOQ.
        // If priceTiers exist, use the price of the lowest tier if quantity is below its minQuantity but meets overall MOQ.
        // A more robust logic might pick the product.price if quantity < lowest_tier.minQuantity
        currentPerUnitCost = product.priceTiers[0].pricePerUnit; 
      }
    }
    
    setPerUnitCost(currentPerUnitCost);
    setTotalPrice(currentPerUnitCost * quantity);
  }, [quantity, product]);

  useEffect(() => {
    calculateCosts();
  }, [quantity, calculateCosts]);

  useEffect(() => {
    // Ensure initial quantity is at least MOQ
    if (quantity < product.minOrderQuantity) {
      setQuantity(product.minOrderQuantity);
    }
  }, [product.minOrderQuantity, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantity(newQuantity);
    } else if (e.target.value === '') {
      setQuantity(0); // Allow empty input, treat as 0 for calculation
    }
  };

  const handlePlaceOrder = () => {
    if (quantity < product.minOrderQuantity) {
      toast({
        title: "Minimum Order Quantity",
        description: `Please order at least ${product.minOrderQuantity} units.`,
        variant: "destructive",
      });
      return;
    }
    const message = `I would like to order ${quantity} units of ${product.name} (SKU: ${product.sku}) at $${perUnitCost.toFixed(2)} per unit. Total: $${totalPrice.toFixed(2)}.`;
    const whatsappUrl = generateWhatsAppUrl(WHATSAPP_PHONE_NUMBER, message);
    window.open(whatsappUrl, '_blank');
  };
  
  function generateWhatsAppUrl(phoneNumber: string, message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }


  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
          Bulk Order: {product.name}
        </CardTitle>
        <CardDescription>
          Minimum Order Quantity (MOQ): {product.minOrderQuantity} units.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-base font-medium">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={0} // Allow 0 to show initial state or if user clears input
            className="text-lg"
            aria-describedby="quantity-error"
          />
          {quantity > 0 && quantity < product.minOrderQuantity && (
            <p id="quantity-error" className="text-sm text-destructive flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              MOQ is {product.minOrderQuantity}. Current quantity is below MOQ.
            </p>
          )}
        </div>

        {product.priceTiers && product.priceTiers.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Price Tiers:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              {product.priceTiers.sort((a,b) => a.minQuantity - b.minQuantity).map((tier) => (
                <li key={tier.minQuantity} className={quantity >= tier.minQuantity ? 'font-medium text-primary' : ''}>
                  {tier.minQuantity}+ units: ${tier.pricePerUnit.toFixed(2)}/unit
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Price Per Unit:</span>
            <span className="font-semibold text-lg text-primary">${perUnitCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Price:</span>
            <span className="font-bold text-2xl text-primary">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
        <Button 
          onClick={handlePlaceOrder} 
          className="w-full sm:w-auto flex-grow"
          disabled={quantity === 0 || quantity < product.minOrderQuantity}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Place Order via WhatsApp
        </Button>
        <WhatsAppButton 
            phoneNumber={WHATSAPP_PHONE_NUMBER}
            message={`I have a custom quote request for ${product.name} (SKU: ${product.sku}).`}
            buttonText="Request Custom Quote"
            variant="outline"
            className="w-full sm:w-auto flex-grow"
          />
      </CardFooter>
    </Card>
  );
}
