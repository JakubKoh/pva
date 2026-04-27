import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Instagram, Facebook, Mail, Leaf, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-fit to-fat py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black">Získej 10% slevu na první objednávku!</h3>
              <p className="text-white/80">Přihlas se k odběru novinek a nepropásni žádnou akci.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Tvůj email"
                className="px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 flex-1 md:w-64 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="bg-white text-fit hover:bg-gray-100 rounded-full px-6 font-bold">
                Odebírat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-4xl font-black text-fit">Fit</span>
              <span className="text-4xl font-black text-gray-500">&</span>
              <span className="text-4xl font-black text-fat">Fat</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Dopoledne zdravě, odpoledne skvěle. Unikátní koncept fast foodu, který ti dá na výběr.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fit transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fit transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fit transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Rychlé odkazy</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-fit transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fit" />
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-fit transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fit" />
                  Pobočky
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-400 hover:text-fit transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fit" />
                  Delivery
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-fit transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fit" />
                  Kariéra
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-white font-medium">+420 123 456 789</p>
                  <p className="text-sm">Objednávky a info</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-white font-medium">info@fitandfat.cz</p>
                  <p className="text-sm">Napište nám</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-white font-medium">Praha & Tobolany</p>
                  <p className="text-sm">2 pobočky</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Otevírací doba</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-fit/20 border border-fit/30">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-4 w-4 text-fit" />
                  <span className="font-bold text-fit">FIT Menu</span>
                </div>
                <p className="text-gray-300">Po-Ne: 8:00 - 12:00</p>
              </div>
              <div className="p-4 rounded-xl bg-fat/20 border border-fat/30">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-4 w-4 text-fat" />
                  <span className="font-bold text-fat">FAT Menu</span>
                </div>
                <p className="text-gray-300">Po-Ne: 12:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Fit & Fat. Všechna práva vyhrazena.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Obchodní podmínky</a>
              <a href="#" className="hover:text-white transition-colors">Ochrana soukromí</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
