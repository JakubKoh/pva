"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, Flame, Leaf, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { useCartStore } from "@/lib/stores/cart-store";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { language, setLanguage } = useLanguageStore();
  const t = getTranslation(language);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/locations", label: t.nav.locations },
    { href: "/delivery", label: t.nav.delivery },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-black text-fit transition-transform group-hover:scale-110">Fit</span>
              <span className="text-2xl sm:text-3xl font-black text-muted-foreground">&</span>
              <span className="text-2xl sm:text-3xl font-black text-fat transition-transform group-hover:scale-110">Fat</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-fit rounded-full hover:bg-fit/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language + Time + Cart + Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full border bg-gray-50 p-0.5">
              <button
                onClick={() => setLanguage("cs")}
                className={cn(
                  "px-2 py-1 text-xs font-bold rounded-full transition-all",
                  language === "cs"
                    ? "bg-fit text-white"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                CZ
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 py-1 text-xs font-bold rounded-full transition-all",
                  language === "en"
                    ? "bg-fit text-white"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                EN
              </button>
            </div>

            {/* Current menu indicator - only on larger screens */}
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-gradient-to-r from-fit/10 to-fat/10 px-3 py-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">
                <span className="text-fit">FIT</span> 8-11 | <span className="text-fat">FAT</span> 11-22
              </span>
            </div>

            {/* Cart */}
            <CartSheet>
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-fit/10 hover:bg-fit/20 rounded-full"
              >
                <ShoppingCart className="h-5 w-5 text-fit" />
                {cartItemsCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-fat-red text-xs font-bold text-white animate-bounce-slow">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </CartSheet>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-gradient-to-b from-white to-gray-50">
                <div className="flex flex-col space-y-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-3 text-lg font-semibold text-foreground transition-all hover:bg-fit/10 hover:text-fit"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Leaf className="h-4 w-4 text-fit" />
                      <span>FIT menu: 8:00 - 11:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Flame className="h-4 w-4 text-fat" />
                      <span>FAT menu: 11:00 - 22:00</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
