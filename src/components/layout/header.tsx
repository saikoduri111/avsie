'use client';

import Link from 'next/link';
import { Shirt, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="/" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
        Catalog
      </Link>
      <Link href="/account" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
        Account
      </Link>
    </>
  );

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Shirt className="h-8 w-8" />
            <span>Wholesale Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks}
            <div className="relative ml-4">
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4 py-2 w-64 rounded-md border focus:border-primary focus:ring-primary" />
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
                    <Shirt className="h-7 w-7" />
                    <span>Wholesale Hub</span>
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
