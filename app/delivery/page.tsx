"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  MapPin,
  Phone,
  User,
  MessageSquare,
  CreditCard,
  Banknote,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/stores/cart-store";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getTranslation } from "@/lib/translations";
import { locations, deliveryZone } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full animate-pulse rounded-lg bg-muted" />
  ),
});

type PaymentMethod = "card" | "cash";

export default function DeliveryPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } =
    useCartStore();
  const { language } = useLanguageStore();
  const t = getTranslation(language);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getTotal();
  const deliveryFee = total >= 500 ? 0 : 49;
  const finalTotal = total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-fit/20">
              <Check className="h-12 w-12 text-fit" />
            </div>
            <h1 className="text-3xl font-bold">{t.deliveryPage.orderReceived}</h1>
            <p className="mt-2 text-muted-foreground">
              {t.deliveryPage.thankYou}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.deliveryPage.deliveryEstimate}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/menu">{t.deliveryPage.backToMenu}</Link>
              </Button>
              <Button asChild variant="fit">
                <Link href="/">{t.deliveryPage.home}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{t.deliveryPage.title}</h1>
          <p className="mt-2 text-muted-foreground">
            {t.deliveryPage.subtitle}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="text-xl font-semibold">{t.deliveryPage.emptyCart}</h2>
              <p className="mt-2 text-muted-foreground">
                {t.deliveryPage.emptyCartDesc}
              </p>
              <Button asChild className="mt-6" variant="fit">
                <Link href="/menu">{t.deliveryPage.viewMenu}</Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{t.deliveryPage.deliveryZone}</CardTitle>
              </CardHeader>
              <CardContent>
                <Map
                  locations={locations}
                  showDeliveryZone={true}
                  deliveryCenter={deliveryZone.center}
                  deliveryRadiusKm={deliveryZone.radiusKm}
                  className="h-[300px] w-full rounded-lg"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  {t.deliveryPage.deliveryZoneInfo}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Form */}
              <div className="space-y-6 lg:col-span-2">
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-fit" />
                      {t.deliveryPage.deliveryAddress}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.deliveryPage.fullName}</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder={t.deliveryPage.fullNamePlaceholder}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.deliveryPage.phone}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder={t.deliveryPage.phonePlaceholder}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="street">{t.deliveryPage.street}</Label>
                      <Input
                        id="street"
                        placeholder={t.deliveryPage.streetPlaceholder}
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.deliveryPage.city}</Label>
                        <Input id="city" placeholder={t.deliveryPage.cityPlaceholder} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">{t.deliveryPage.zip}</Label>
                        <Input id="zip" placeholder={t.deliveryPage.zipPlaceholder} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="note">{t.deliveryPage.note}</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="note"
                          placeholder={t.deliveryPage.notePlaceholder}
                          className="min-h-[80px] pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Zone Map */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.deliveryPage.deliveryZone}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Map
                      locations={locations}
                      showDeliveryZone={true}
                      deliveryCenter={deliveryZone.center}
                      deliveryRadiusKm={deliveryZone.radiusKm}
                      className="h-[300px] w-full rounded-lg"
                    />
                    <p className="mt-3 text-sm text-muted-foreground">
                      {t.deliveryPage.deliveryZoneInfo}
                    </p>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.deliveryPage.paymentMethod}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                          paymentMethod === "card"
                            ? "border-fit bg-fit/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <CreditCard
                          className={cn(
                            "h-6 w-6",
                            paymentMethod === "card"
                              ? "text-fit"
                              : "text-muted-foreground"
                          )}
                        />
                        <div className="text-left">
                          <p className="font-medium">{t.deliveryPage.cardOnline}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.deliveryPage.cardPayment}
                          </p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                          paymentMethod === "cash"
                            ? "border-fit bg-fit/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <Banknote
                          className={cn(
                            "h-6 w-6",
                            paymentMethod === "cash"
                              ? "text-fit"
                              : "text-muted-foreground"
                          )}
                        />
                        <div className="text-left">
                          <p className="font-medium">{t.deliveryPage.cash}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.deliveryPage.cashOnDelivery}
                          </p>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Cart Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      {t.deliveryPage.yourOrder}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="max-h-[300px] space-y-3 overflow-y-auto">
                      {items.map((item) => {
                        const extrasTotal = item.selectedExtras.reduce(
                          (sum, extra) => sum + extra.price,
                          0
                        );
                        const itemTotal =
                          (item.menuItem.price + extrasTotal) * item.quantity;

                        return (
                          <div
                            key={item.id}
                            className="flex gap-3 rounded-lg border p-3"
                          >
                            <div
                              className="h-16 w-16 flex-shrink-0 rounded-md bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${item.menuItem.image})`,
                              }}
                            />
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.menuItem.name}
                                  </p>
                                  {item.selectedExtras.length > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      +{" "}
                                      {item.selectedExtras
                                        .map((e) => e.name)
                                        .join(", ")}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-6 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <span className="text-sm font-semibold">
                                  {itemTotal} Kč
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.deliveryPage.subtotal}</span>
                        <span>{total} {t.common.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.deliveryPage.delivery}</span>
                        <span>
                          {deliveryFee === 0 ? (
                            <span className="text-fit">{t.deliveryPage.free}</span>
                          ) : (
                            `${deliveryFee} ${t.common.price}`
                          )}
                        </span>
                      </div>
                      {total < 500 && (
                        <p className="text-xs text-muted-foreground">
                          {t.deliveryPage.freeDeliveryRemaining.replace('{amount}', String(500 - total))}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>{t.deliveryPage.total}</span>
                      <span>{finalTotal} {t.common.price}</span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      variant="fit"
                    >
                      {t.deliveryPage.placeOrder.replace('{amount}', String(finalTotal))}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      {t.deliveryPage.expectedDelivery}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
