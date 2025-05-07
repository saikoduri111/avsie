import { Button } from '@/components/ui/button';
import { generateWhatsAppUrl } from '@/services/whatsapp';
import { MessageSquare } from 'lucide-react'; // Using MessageSquare as a generic messaging icon

interface WhatsAppButtonProps {
  phoneNumber: string;
  productSku?: string;
  message?: string;
  buttonText?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null | undefined;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber,
  productSku,
  message,
  buttonText = "Order via WhatsApp",
  variant = "default",
  className
}: WhatsAppButtonProps) {
  
  const defaultMessage = productSku 
    ? `Hello, I'm interested in product SKU: ${productSku}. Can you provide more information?`
    : `Hello, I'd like to make an inquiry.`;
  
  const finalMessage = message || defaultMessage;
  const whatsappUrl = generateWhatsAppUrl(phoneNumber, finalMessage);

  return (
    <Button asChild variant={variant} className={className}>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageSquare className="mr-2 h-5 w-5" />
        {buttonText}
      </a>
    </Button>
  );
}
