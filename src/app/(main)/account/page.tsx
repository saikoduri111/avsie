import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ListOrdered, FileText, Repeat } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <User className="mr-3 h-8 w-8 text-primary" />
          My Account
        </h1>
        <Button variant="outline">Sign Out</Button>
      </div>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl">Welcome, Buyer!</CardTitle>
          <CardDescription>This is your personal account area. More features coming soon!</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <FeatureCard
            icon={<ListOrdered className="h-8 w-8 text-primary" />}
            title="Order History"
            description="View your past orders and track their status."
            comingSoon
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Invoices"
            description="Access and download your invoices."
            comingSoon
          />
          <FeatureCard
            icon={<Repeat className="h-8 w-8 text-primary" />}
            title="Re-order"
            description="Quickly re-order items from your previous purchases."
            comingSoon
          />
           <FeatureCard
            icon={<User className="h-8 w-8 text-primary" />}
            title="Profile Settings"
            description="Manage your account details and preferences."
            comingSoon
          />

        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          For any assistance, please contact our support team.
        </p>
         <Button variant="link" asChild className="text-primary">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}

function FeatureCard({ icon, title, description, comingSoon }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {comingSoon && (
          <div className="mt-2 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full inline-block">
            Coming Soon
          </div>
        )}
      </CardContent>
    </Card>
  );
}
