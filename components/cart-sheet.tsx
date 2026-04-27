"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/stores/cart-store";
import { useLanguageStore } from "@/lib/stores/language-store";
import { getLocalizedName } from "@/lib/utils";

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const { language } = useLanguageStore();
  const total = getTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Košík ({items.reduce((sum, item) => sum + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Košík je prázdný</h3>
              <p className="text-sm text-muted-foreground">
                Přidej si něco dobrého z našeho menu!
              </p>
            </div>
            <Button asChild variant="default">
              <Link href="/menu">Prohlédnout menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => {
                  const extrasTotal = item.selectedExtras.reduce(
                    (sum, extra) => sum + extra.price,
                    0
                  );
                  const itemTotal = (item.menuItem.price + extrasTotal) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-lg border p-3"
                    >
                      <div
                        className="h-20 w-20 flex-shrink-0 rounded-md bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.menuItem.image})` }}
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{getLocalizedName(item.menuItem, language)}</h4>
                            {item.selectedExtras.length > 0 && (
                              <p className="text-xs text-muted-foreground">
                                + {item.selectedExtras.map((e) => e.name).join(", ")}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="font-semibold">{itemTotal} Kč</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Celkem</span>
                <span>{total} Kč</span>
              </div>
              <SheetFooter className="gap-2 sm:flex-col">
                <Button asChild className="w-full" size="lg" variant="fit">
                  <Link href="/delivery">Objednat delivery</Link>
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
