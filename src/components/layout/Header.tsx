"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Design Your Bag", href: "/design" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/30 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-primary">
              Purple Bags
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
            Request Quote
          </Link>
          <Link href="/collections" className={buttonVariants({ variant: "default" })}>
            Design Your Bag
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button variant="ghost" size="icon" aria-label="Toggle navigation menu">
                <Menu className="h-6 w-6" />
              </Button>
            }
          />
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="grid gap-6 p-6">
              <Link href="/" className="font-heading text-2xl font-bold text-primary">
                Purple Bags
              </Link>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="grid gap-4 mt-6">
                <Link href="/contact" className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}>
                  Request Quote
                </Link>
                <Link href="/collections" className={buttonVariants({ variant: "default", className: "w-full justify-center" })}>
                  Design Your Bag
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
