"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Menu, MapPin, Frown } from "lucide-react";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";

export default function NotFound() {
  const { language } = useLanguageStore();
  const t = getTranslation(language);

  return (
    <main className="min-h-screen bg-gradient-to-br from-fit/10 via-white to-fat/10 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <div className="text-[12rem] sm:text-[16rem] font-black leading-none">
            <span className="text-fit drop-shadow-lg">4</span>
            <span className="relative inline-block">
              <Frown className="h-32 w-32 sm:h-40 sm:w-40 text-muted-foreground animate-bounce inline-block mx-4" />
            </span>
            <span className="text-fat drop-shadow-lg">4</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="text-9xl font-black text-gray-200">
              {language === "cs" ? "HLAD?" : "HUNGRY?"}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            {language === "cs" ? "Tato stránka neexistuje" : "Page not found"}
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            {language === "cs"
              ? "Vypadá to, že ses ztratil na cestě k jídlu..."
              : "Looks like you got lost on the way to food..."}
          </p>
          <p className="text-muted-foreground">
            {language === "cs"
              ? "Ale neboj, máme spoustu dobrého jídla jinde!"
              : "But don't worry, we have plenty of good food elsewhere!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Button asChild size="lg" variant="fit" className="font-bold shadow-lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              {language === "cs" ? "Domů" : "Go Home"}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold border-2 border-fit/30 hover:bg-fit/10">
            <Link href="/menu">
              <Menu className="mr-2 h-5 w-5" />
              {language === "cs" ? "Zobrazit menu" : "View Menu"}
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4 font-semibold">
            {language === "cs" ? "Můžeš vyzkoušet:" : "You can try:"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-fit hover:bg-fit/5 transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              {language === "cs" ? "Naše pobočky" : "Our Locations"}
            </Link>
            <Link
              href="/delivery"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-fat hover:bg-fat/5 transition-colors text-sm font-medium"
            >
              <Search className="h-4 w-4" />
              {language === "cs" ? "Objednat rozvoz" : "Order Delivery"}
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-fit/10 to-fat/10 border border-fit/20">
          <p className="text-sm text-muted-foreground italic">
            {language === "cs"
              ? "💡 Věděl jsi, že stránka 404 získala své jméno podle čísla pokoje v CERNu, kde byla první webová stránka?"
              : "💡 Did you know that the 404 page got its name from the room number at CERN where the first web page was located?"}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {language === "cs"
              ? "(Není to pravda, ale zní to dobře! 😄)"
              : "(Not actually true, but sounds good! 😄)"}
          </p>
        </div>
      </div>
    </main>
  );
}
