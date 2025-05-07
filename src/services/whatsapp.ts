/**
 * Generates a WhatsApp URL with a pre-filled message.
 *
 * @param phoneNumber The recipient's phone number (including country code).
 * @param message The pre-filled message to send.
 * @returns The encoded URL string.
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  // TODO: Implement URL encoding and construction.
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
