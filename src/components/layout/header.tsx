
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    // Ensure basePath is set only on the client-side to avoid hydration mismatches
    setBasePath(process.env.NEXT_PUBLIC_BASE_PATH || '');
  }, []);

  const navLinks = (
    <>
      <Link href="/" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
        Catalog
      </Link>
      <Link href="/account" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
        Account
      </Link>
      <Link href="/contact" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
        Contact Us
      </Link>
    </>
  );

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height for logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            {basePath !== undefined && ( // Conditionally render Image to prevent error if basePath is not yet set
              <Image
                src={`${basePath}/assets/img/avsie_logo.png`}
                alt="AVSIE Logo"
                width={110} 
                height={30} 
                className="object-contain" // Ensures the entire logo is visible and maintains aspect ratio
                priority // Prioritize loading the logo
                unoptimized // Necessary for static export
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks}
            <div className="relative ml-2 lg:ml-4">
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-48 lg:w-64 rounded-md border focus:border-primary focus:ring-primary" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-3/4 sm:w-1/2 bg-card p-6">
                <div className="flex flex-col space-y-4">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                     {basePath !== undefined && (
                       <Image
                          src={`${basePath}/assets/img/avsie_logo.png`}
                          alt="AVSIE Logo"
                          width={120} // Slightly smaller logo for mobile menu
                          height={35}
                          className="object-contain"
                          priority
                          unoptimized
                        />
                     )}
                  </Link>
                  {navLinks}
                  <div className="relative mt-4">
                    <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full rounded-md border focus:border-primary focus:ring-primary" />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
