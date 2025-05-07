import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_PHONE_NUMBER } from "@/lib/mock-data";
import { WhatsAppButton } from "@/components/common/whatsapp-button";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We&apos;re here to help! Reach out to us with any questions or inquiries.
        </p>
      </div>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl">Get in Touch</CardTitle>
          <CardDescription>Fill out the form below or use one of the contact methods.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your inquiry about?" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={5} />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Other Ways to Contact Us</h3>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <span>support@avsie.example.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary" />
              <span>+91 98765 43210</span>
            </div>
            <div>
              <WhatsAppButton 
                phoneNumber={WHATSAPP_PHONE_NUMBER}
                message="Hello AVSIE, I have a question."
                buttonText="Chat on WhatsApp"
                variant="secondary"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
