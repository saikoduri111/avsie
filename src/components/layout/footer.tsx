export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted border-t border-border mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p>&copy; {currentYear} AVSIE. All rights reserved.</p>
        <p className="text-sm mt-1">Your Premier Destination for Wholesale Clothing</p>
      </div>
    </footer>
  );
}
