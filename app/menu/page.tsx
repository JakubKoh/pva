"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuCard } from "@/components/menu-card";
import { menuItems } from "@/lib/menu-data";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";
import { Leaf, Flame, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function MenuContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as "fit" | "fat" | null;
  const [activeTab, setActiveTab] = useState<"fit" | "fat">(mode || "fit");
  const { language } = useLanguageStore();
  const t = getTranslation(language);

  // Update tab when URL changes
  useEffect(() => {
    if (mode && (mode === "fit" || mode === "fat")) {
      setActiveTab(mode);
    }
  }, [mode]);

  const fitItems = menuItems.filter((item) => item.category === "fit");
  const fatItems = menuItems.filter((item) => item.category === "fat");

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src={activeTab === "fit"
            ? "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1920&q=80"
            : "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1920&q=80"
          }
          alt="Menu banner"
          fill
          className="object-cover transition-all duration-700"
          priority
        />
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          activeTab === "fit"
            ? "bg-gradient-to-r from-green-900/90 via-green-800/70 to-green-900/50"
            : "bg-gradient-to-r from-amber-900/90 via-orange-800/70 to-red-900/50"
        )} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
              activeTab === "fit" ? "bg-fit/30" : "bg-fat/30"
            )}>
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{t.features.fresh}</span>
            </div>
            <h1 className="text-5xl font-black mb-2">{t.menuPage.title}</h1>
            <p className="text-xl text-white/80">
              {activeTab === "fit"
                ? t.menuSection.fitDesc
                : t.menuSection.fatDesc
              }
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Menu Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "fit" | "fat")}
          className="w-full"
        >
          <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4 border-b">
            <TabsList className="mx-auto grid w-full max-w-lg grid-cols-2 h-14 p-1 bg-gray-100 rounded-full">
              <TabsTrigger
                value="fit"
                className={cn(
                  "rounded-full h-12 text-base font-bold transition-all",
                  "data-[state=active]:bg-fit data-[state=active]:text-white data-[state=active]:shadow-lg"
                )}
              >
                <Leaf className="mr-2 h-5 w-5" />
                {t.hero.fitMenu}
                <span className="ml-2 text-xs opacity-70">8:00-12:00</span>
              </TabsTrigger>
              <TabsTrigger
                value="fat"
                className={cn(
                  "rounded-full h-12 text-base font-bold transition-all",
                  "data-[state=active]:bg-fat data-[state=active]:text-white data-[state=active]:shadow-lg"
                )}
              >
                <Flame className="mr-2 h-5 w-5" />
                {t.hero.fatMenu}
                <span className="ml-2 text-xs opacity-70">12:00-22:00</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="fit" className="mt-8">
            {/* Info Banner */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-fit/20 via-fit/10 to-green-50 p-6 border border-fit/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-fit/20 flex items-center justify-center">
                    <Leaf className="h-7 w-7 text-fit" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-fit">{t.menuPage.fitBadge}</h3>
                    <p className="text-muted-foreground">{t.menuSection.fitDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Clock className="h-4 w-4 text-fit" />
                  <span className="font-semibold">8:00 - 12:00</span>
                </div>
              </div>
            </div>

            {/* Category Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Toasty", img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80" },
                { name: "Vajíčka", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80" },
                { name: "Waffle", img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&q=80" },
                { name: "Bowls", img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80" },
              ].map((cat, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-bold">{cat.name}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fitItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fat" className="mt-8">
            {/* Info Banner */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-fat/20 via-orange-100 to-red-50 p-6 border border-fat/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-fat/20 flex items-center justify-center">
                    <Flame className="h-7 w-7 text-fat" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-fat">{t.menuPage.fatBadge}</h3>
                    <p className="text-muted-foreground">{t.menuSection.fatDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Clock className="h-4 w-4 text-fat" />
                  <span className="font-semibold">12:00 - 22:00</span>
                </div>
              </div>
            </div>

            {/* Category Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Burgery", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
                { name: "Stripsy", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80" },
                { name: "Hranolky", img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&q=80" },
                { name: "Wrapy", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80" },
              ].map((cat, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-bold">{cat.name}</span>
                </div>
              ))}
            </div>

            {/* Special Promo */}
            <div className="mb-8 relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80"
                alt="Special offer"
                width={1200}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-orange-500/80 flex items-center">
                <div className="p-6 text-white">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">NOVINKA</span>
                  <h3 className="text-2xl font-black">Bezedné omáčky ke každému jídlu!</h3>
                  <p className="text-white/90">Ranch, BBQ, Česneková, Sýrová a další...</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fatItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-fit border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
