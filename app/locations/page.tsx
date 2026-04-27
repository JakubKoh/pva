"use client";

import dynamic from "next/dynamic";
import { MapPin, Phone, Clock, Navigation, Truck, Star, Leaf, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { locations, deliveryZone } from "@/lib/menu-data";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";
import Image from "next/image";

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-lg bg-muted" />
  ),
});

export default function LocationsPage() {
  const { language } = useLanguageStore();
  const t = getTranslation(language);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-fit/90 via-fit-dark/85 to-fat/80" />
        </div>

        {/* Background pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <MapPin className="mr-1 h-3 w-3" />
              2 {t.locationsPage.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
              {t.locationsPage.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-6">
              {t.locationsPage.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">8:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">{t.locationsPage.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                <span className="font-semibold">5/5 {t.hero.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Interactive Map Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">{t.locationsPage.findUs}</h2>
            <p className="text-muted-foreground">{t.locationsPage.clickMarkers}</p>
          </div>

          <div className="overflow-hidden rounded-2xl border-4 border-fit/20 shadow-2xl">
            <Map
              locations={locations}
              showDeliveryZone={true}
              deliveryCenter={deliveryZone.center}
              deliveryRadiusKm={deliveryZone.radiusKm}
              className="h-[500px] w-full"
            />
          </div>

          {/* Delivery Zone Info with better styling */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-gradient-to-br from-fit/20 to-fit/5 border border-fit/30 p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-fit/20 p-3">
                  <Navigation className="h-6 w-6 text-fit" />
                </div>
                <div>
                  <h3 className="font-bold text-fit-dark mb-1">{t.locationsPage.deliveryZoneTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.locationsPage.deliveryZoneDesc}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-fat/20 to-fat/5 border border-fat/30 p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-fat/20 p-3">
                  <Truck className="h-6 w-6 text-fat" />
                </div>
                <div>
                  <h3 className="font-bold text-fat-dark mb-1">{t.locationsPage.fastDelivery}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.locationsPage.fastDeliveryDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Cards with Images */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t.locationsPage.ourRestaurants}</h2>
            <p className="text-muted-foreground">{t.locationsPage.visitOrOrder}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {locations.map((location, index) => (
              <Card key={location.id} className="overflow-hidden border-0 shadow-2xl card-hover group">
                {/* Location Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-fit to-fat">
                  <Image
                    src={
                      index === 0
                        ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                        : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                    }
                    alt={location.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge overlay */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-fit text-white border-0 shadow-lg">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      5.0
                    </Badge>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white drop-shadow-lg">
                      {location.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4 bg-gradient-to-br from-white to-gray-50">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <MapPin className="mt-0.5 h-5 w-5 text-fit flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{location.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {location.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Phone className="h-5 w-5 text-fit flex-shrink-0" />
                      <a
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="font-semibold hover:text-fit transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <Clock className="h-5 w-5 text-fit flex-shrink-0" />
                      <span className="font-medium">{location.hours}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="border-2 border-fit/30 hover:bg-fit/10 hover:border-fit font-bold"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`,
                          "_blank"
                        )
                      }
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      {t.locationsPage.navigate}
                    </Button>
                    <Button
                      variant="fit"
                      className="font-bold shadow-lg"
                      onClick={() =>
                        window.open(`tel:${location.phone.replace(/\s/g, "")}`)
                      }
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {t.locationsPage.call}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Opening Hours Detail - Enhanced */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-fit/20">
          <div className="bg-gradient-to-r from-fit to-fat p-6 text-white">
            <h2 className="text-2xl font-black text-center">{t.locationsPage.openingHoursMenu}</h2>
            <p className="text-center text-white/90 mt-1">{t.locationsPage.dualConcept}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 p-6 bg-white">
            {/* FIT Menu Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-fit/20 via-fit/10 to-white border-2 border-fit/30 p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fit/10 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-fit p-3">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-fit-dark">
                    {t.hero.fitMenu}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-fit" />
                    <p className="text-sm font-semibold">
                      {t.locationsPage.mondaySunday}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-fit/20">
                    <p className="text-2xl font-black text-fit-dark">8:00 - 12:00</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ✓ {t.locationsPage.healthyBreakfasts}<br />
                    ✓ {t.locationsPage.freshSalads}<br />
                    ✓ {t.locationsPage.energyBowls}
                  </p>
                </div>
              </div>
            </div>

            {/* FAT Menu Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-fat/20 via-fat/10 to-white border-2 border-fat/30 p-6 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fat/10 rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-fat p-3">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-fat-dark">
                    {t.hero.fatMenu}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-fat" />
                    <p className="text-sm font-semibold">
                      {t.locationsPage.mondaySunday}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-fat/20">
                    <p className="text-2xl font-black text-fat-dark">12:00 - 22:00</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ✓ {t.locationsPage.juicyBurgers}<br />
                    ✓ {t.locationsPage.crispyStrips}<br />
                    ✓ {t.locationsPage.cheesyFries}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
