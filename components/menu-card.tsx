"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MenuItem, Extra } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (item.extras && item.extras.length > 0) {
      setDialogOpen(true);
    } else {
      addItem(item);
      showAddedFeedback();
    }
  };

  const handleConfirmAdd = () => {
    addItem(item, selectedExtras);
    setSelectedExtras([]);
    setDialogOpen(false);
    showAddedFeedback();
  };

  const showAddedFeedback = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);

  return (
    <>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant={item.category === "fit" ? "fit" : "fat"}
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="text-xl font-bold">{item.price} Kč</span>
          <Button
            onClick={handleAddToCart}
            variant={item.category === "fit" ? "fit" : "fat"}
            size="sm"
            className={cn(
              "transition-all",
              addedToCart && "bg-green-600 hover:bg-green-600"
            )}
          >
            {addedToCart ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Přidáno
              </>
            ) : (
              <>
                <Plus className="mr-1 h-4 w-4" />
                Do košíku
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Customization Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription>
              Vyber si přídavky k tvému jídlu
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {item.extras?.map((extra) => (
                <div
                  key={extra.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.some((e) => e.id === extra.id)}
                      onCheckedChange={() => toggleExtra(extra)}
                    />
                    <Label htmlFor={extra.id} className="cursor-pointer">
                      {extra.name}
                    </Label>
                  </div>
                  <span className="text-sm font-medium">+{extra.price} Kč</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Celkem</p>
              <p className="text-xl font-bold">{item.price + extrasTotal} Kč</p>
            </div>
            <Button
              onClick={handleConfirmAdd}
              variant={item.category === "fit" ? "fit" : "fat"}
            >
              <Plus className="mr-1 h-4 w-4" />
              Přidat do košíku
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
