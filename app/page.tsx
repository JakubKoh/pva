"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Leaf,
  Flame,
  Clock,
  MapPin,
  Bike,
  Star,
  Zap,
  Heart,
  ChefHat,
  Truck,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuItems, locations, deliveryZone } from "@/lib/menu-data";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-2xl bg-gray-200" />
  ),
});

const heroImages = {
  fit: [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  ],
  fat: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
    "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80",
  ],
};

const testimonials = {
  cs: [
    { name: "Martin K.", text: "Nejlepší snídaně v Praze! Avokádový toast je fantastický.", rating: 5, type: "fit" },
    { name: "Petra S.", text: "Big Mac MAXI je legenda. Bezedné omáčky jsou geniální nápad!", rating: 5, type: "fat" },
    { name: "Jakub M.", text: "Miluju ten koncept - ráno zdravě, odpoledne si dopřeju.", rating: 5, type: "both" },
  ],
  en: [
    { name: "Martin K.", text: "Best breakfast in Prague! The avocado toast is fantastic.", rating: 5, type: "fit" },
    { name: "Petra S.", text: "Big Mac MAXI is legendary. Unlimited sauces are genius!", rating: 5, type: "fat" },
    { name: "Jakub M.", text: "Love the concept - healthy mornings, indulgent afternoons.", rating: 5, type: "both" },
  ],
};

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<"fit" | "fat">("fit");
  const { language } = useLanguageStore();
  const t = getTranslation(language);

  const featuredFit = menuItems.filter((item) => item.category === "fit").slice(0, 4);
  const featuredFat = menuItems.filter((item) => item.category === "fat").slice(0, 4);
  const featuredItems = activeMode === "fit" ? featuredFit : featuredFat;
  const currentTestimonials = testimonials[language];

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section - Street Food Vibe */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background with texture overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeMode === "fit"
              ? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
              : "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1920&q=80"
            }
            alt="Hero background"
            fill
            className="object-cover transition-all duration-700"
            priority
          />
          <div className={cn(
            "absolute inset-0 transition-all duration-500",
            activeMode === "fit"
              ? "bg-gradient-to-r from-black/80 via-green-900/70 to-black/60"
              : "bg-gradient-to-r from-black/80 via-orange-900/70 to-black/60"
          )} />
          {/* Texture overlay for street food vibe */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              {/* Street food badge */}
              <div className="flex items-center gap-3">
                <Badge className={cn(
                  "text-sm px-4 py-2 rounded-full font-bold border-2",
                  activeMode === "fit"
                    ? "bg-fit/20 text-fit-vibrant border-fit/50"
                    : "bg-fat/20 text-fat-vibrant border-fat/50"
                )}>
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  {t.hero.badge}
                </Badge>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-lg leading-tight">
                <span className={activeMode === "fit" ? "text-fit-vibrant" : "text-white"}>Fit</span>
                <span className="text-white/60"> & </span>
                <span className={activeMode === "fat" ? "text-fat-vibrant" : "text-white"}>Fat</span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 font-medium max-w-lg leading-relaxed">
                {t.hero.tagline}
              </p>

              <p className="text-lg text-white/70">
                {activeMode === "fit" ? t.hero.fitDesc : t.hero.fatDesc}
              </p>

              {/* Mode Switcher - bigger, more prominent */}
              <div className="inline-flex rounded-2xl bg-white/10 backdrop-blur-md p-2 shadow-2xl border border-white/20">
                <button
                  onClick={() => setActiveMode("fit")}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 sm:px-8 py-4 text-base font-bold transition-all",
                    activeMode === "fit"
                      ? "bg-fit text-white shadow-lg shadow-fit/30 scale-105"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  <Leaf className="h-5 w-5" />
                  {t.hero.fitMenu}
                </button>
                <button
                  onClick={() => setActiveMode("fat")}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-6 sm:px-8 py-4 text-base font-bold transition-all",
                    activeMode === "fat"
                      ? "bg-fat text-white shadow-lg shadow-fat/30 scale-105"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  <Flame className="h-5 w-5" />
                  {t.hero.fatMenu}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "text-lg px-8 py-6 rounded-xl font-bold btn-pulse shadow-xl",
                    activeMode === "fit" ? "bg-fit hover:bg-fit-dark" : "bg-fat hover:bg-fat-dark"
                  )}
                >
                  <Link href={`/menu?mode=${activeMode}`}>
                    {t.hero.viewMenu}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl font-bold bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Link href="/delivery">
                    <Bike className="mr-2 h-5 w-5" />
                    {t.hero.orderHome}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">2</p>
                  <p className="text-sm text-white/60">{t.hero.locations}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">30min</p>
                  <p className="text-sm text-white/60">{t.hero.delivery}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">4.9★</p>
                  <p className="text-sm text-white/60">{t.hero.rating}</p>
                </div>
              </div>
            </div>

            {/* Right - Floating Food Images */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px]">
                {/* Main large image */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 xl:w-80 xl:h-80 rounded-3xl overflow-hidden shadow-2xl animate-float ring-4 ring-white/20">
                  <Image
                    src={activeMode === "fit" ? heroImages.fit[0] : heroImages.fat[0]}
                    alt="Featured food"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Small floating images */}
                <div className="absolute left-0 top-10 w-40 h-40 xl:w-48 xl:h-48 rounded-2xl overflow-hidden shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
                  <Image
                    src={activeMode === "fit" ? heroImages.fit[1] : heroImages.fat[1]}
                    alt="Food item"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute left-16 bottom-0 w-36 h-36 xl:w-40 xl:h-40 rounded-2xl overflow-hidden shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                  <Image
                    src={activeMode === "fit" ? heroImages.fit[2] : heroImages.fat[2]}
                    alt="Food item"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative badge */}
                <div className={cn(
                  "absolute right-16 top-0 rounded-2xl p-4 shadow-xl backdrop-blur-md border border-white/20",
                  activeMode === "fit" ? "bg-fit/80" : "bg-fat/80"
                )}>
                  <p className="text-white font-bold text-lg">
                    {activeMode === "fit" ? "8:00 - 12:00" : "12:00 - 22:00"}
                  </p>
                  <p className="text-white/80 text-sm">{t.common.open}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className={cn(
        "py-6 transition-colors duration-500",
        activeMode === "fit" ? "bg-fit" : "bg-fat"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-white">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-base">{t.features.open}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-base">{t.features.delivery}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-base">{t.features.fresh}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-base">{t.features.homemade}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 sm:mb-12 text-center">
            <Badge variant={activeMode === "fit" ? "fit" : "fat"} className="mb-4 px-4 py-1.5 text-sm">
              {activeMode === "fit" ? <Leaf className="w-4 h-4 mr-1" /> : <Flame className="w-4 h-4 mr-1" />}
              {activeMode === "fit" ? t.menuSection.morningOffer : t.menuSection.afternoonOffer}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black">
              {activeMode === "fit" ? t.menuSection.fitTitle : t.menuSection.fatTitle}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {activeMode === "fit" ? t.menuSection.fitDesc : t.menuSection.fatDesc}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden card-hover border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover img-zoom"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-base sm:text-lg drop-shadow-lg line-clamp-1">{item.name}</p>
                  </div>
                  <div className="absolute right-2 top-2">
                    <div className="bg-white rounded-full px-2 py-1 font-bold text-sm shadow-lg">
                      {item.price} {t.common.price}
                    </div>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "w-full rounded-full font-bold text-sm",
                      item.category === "fit" ? "bg-fit hover:bg-fit-dark" : "bg-fat hover:bg-fat-dark"
                    )}
                  >
                    <Link href={`/menu?mode=${item.category}`}>{t.menuSection.order}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "rounded-full px-8 font-bold border-2",
                activeMode === "fit"
                  ? "border-fit text-fit hover:bg-fit hover:text-white"
                  : "border-fat text-fat hover:bg-fat hover:text-white"
              )}
            >
              <Link href={`/menu?mode=${activeMode}`}>
                {t.menuSection.viewAll}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dual Concept Section - Visual Split */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* FIT Side */}
          <div className="relative min-h-[400px] md:min-h-[500px] group cursor-pointer" onClick={() => setActiveMode("fit")}>
            <Image
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&q=80"
              alt="Healthy food"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-900/80 flex items-center justify-center transition-opacity group-hover:opacity-95">
              <div className="text-center text-white p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Leaf className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black mb-2">{t.hero.fitMenu}</h3>
                <p className="text-lg sm:text-xl text-white/90 mb-3 sm:mb-4">{t.concept.fitTime}</p>
                <p className="text-white/80 max-w-sm mx-auto text-sm sm:text-base">
                  {t.concept.fitDesc}
                </p>
              </div>
            </div>
          </div>

          {/* FAT Side */}
          <div className="relative min-h-[400px] md:min-h-[500px] group cursor-pointer" onClick={() => setActiveMode("fat")}>
            <Image
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1000&q=80"
              alt="Fast food"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/90 to-red-900/80 flex items-center justify-center transition-opacity group-hover:opacity-95">
              <div className="text-center text-white p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Flame className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black mb-2">{t.hero.fatMenu}</h3>
                <p className="text-lg sm:text-xl text-white/90 mb-3 sm:mb-4">{t.concept.fatTime}</p>
                <p className="text-white/80 max-w-sm mx-auto text-sm sm:text-base">
                  {t.concept.fatDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Locations */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-4 bg-fit/10 text-fit border-fit/20">
              <MapPin className="w-4 h-4 mr-1" />
              {t.locations.deliveryZone}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black">{t.locations.title}</h2>
            <p className="text-muted-foreground mt-2">{t.locations.subtitle}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Map */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl border">
              <Map
                locations={locations}
                showDeliveryZone={true}
                deliveryCenter={deliveryZone.center}
                deliveryRadiusKm={deliveryZone.radiusKm}
                className="h-[400px] w-full"
              />
            </div>

            {/* Location Cards */}
            <div className="space-y-4">
              {locations.map((location) => (
                <Card key={location.id} className="card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative h-32">
                    <Image
                      src={location.id === "prague"
                        ? "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80"
                        : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                      }
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-bold">{location.name}</h3>
                      <p className="text-sm text-white/80">{location.address}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{location.hours}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`,
                            "_blank"
                          )
                        }
                      >
                        {t.locations.navigate}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="p-4 rounded-xl bg-fit/10 border border-fit/20">
                <p className="text-sm text-fit font-medium">
                  <Truck className="inline w-4 h-4 mr-1" />
                  {t.locations.deliveryInfo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black">{t.testimonials.title}</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-fat text-fat" />
              ))}
              <span className="ml-2 text-muted-foreground">4.9 {t.testimonials.rating}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {currentTestimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-fat text-fat" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm sm:text-base">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                      testimonial.type === "fit" ? "bg-fit/20 text-fit" :
                        testimonial.type === "fat" ? "bg-fat/20 text-fat" :
                          "bg-gradient-to-r from-fit/20 to-fat/20"
                    )}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=80"
          alt="Restaurant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fit via-fit/90 to-fat" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <ChefHat className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
              {t.cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto">
              {t.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-fit hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-bold"
              >
                <Link href="/delivery">
                  <Bike className="mr-2 h-5 w-5" />
                  {t.cta.orderDelivery}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-bold"
              >
                <Link href="/locations">
                  <MapPin className="mr-2 h-5 w-5" />
                  {t.cta.findLocation}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
