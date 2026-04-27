# 🍔 Fit & Fat

> **Dopoledne zdravě, odpoledne jak chceš.**  
> Healthy mornings, indulgent afternoons.

A web application for a fictional fast food restaurant with a **dual concept** — healthy FIT menu in the morning and indulgent FAT menu in the afternoon.

**Live demo:** [https://jakubkoh.github.io/pva](https://jakubkoh.github.io/pva)

---

## 📋 About

Fit & Fat is a modern restaurant web app built as a school project (PVA). The restaurant operates with a unique split-menu concept:

- **FIT Menu** (8:00 – 12:00) — Healthy breakfasts, smoothie bowls, protein waffles, poke bowls
- **FAT Menu** (12:00 – 22:00) — Burgers, chicken strips, loaded fries, milkshakes

The app supports **Czech and English** languages and includes a fully functional cart with delivery ordering.

---

## ✨ Features

- 🌐 **Bilingual** — Full Czech/English UI with language switcher
- 🛒 **Shopping cart** — Add items with extras/customizations, persisted to localStorage
- 🗺️ **Interactive map** — Leaflet map showing restaurant locations and delivery zone
- 🚚 **Delivery page** — Complete order form with address, payment method, and order summary
- 📱 **Responsive design** — Fully mobile-friendly with a hamburger menu
- 🎨 **Dual theming** — Green (FIT) and yellow/orange (FAT) color schemes that adapt based on the active mode
- ⚡ **Animations** — Floating images, card hover effects, shimmer buttons, smooth transitions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management (cart, language) |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives (Dialog, Tabs, Sheet, etc.) |
| [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) | Interactive maps |
| [Lucide React](https://lucide.dev/) | Icons |
| [GitHub Pages](https://pages.github.com/) | Hosting (static export) |

---

## 📁 Project Structure

```
Fit and fat/
├── app/
│   ├── page.tsx              # Homepage (hero, featured items, map, testimonials)
│   ├── layout.tsx            # Root layout (navbar, footer, providers)
│   ├── globals.css           # Global styles and animations
│   ├── not-found.tsx         # Custom 404 page
│   ├── menu/page.tsx         # Menu page with FIT/FAT tabs
│   ├── delivery/page.tsx     # Delivery order form + cart summary
│   └── locations/page.tsx    # Restaurant locations with map
├── components/
│   ├── navbar.tsx            # Navigation bar with cart + language switcher
│   ├── footer.tsx            # Footer with newsletter, links, hours
│   ├── menu-card.tsx         # Menu item card with extras dialog
│   ├── cart-sheet.tsx        # Slide-out cart panel
│   ├── map.tsx               # Leaflet map component
│   ├── providers.tsx         # Client-side providers wrapper
│   └── ui/                   # Reusable UI components (Button, Card, Dialog, etc.)
├── lib/
│   ├── menu-data.ts          # Menu items, locations, delivery zone data
│   ├── translations.ts       # Czech & English UI translations
│   ├── types.ts              # TypeScript type definitions
│   ├── utils.ts              # Utility functions (cn, localization helpers)
│   └── stores/
│       ├── cart-store.ts     # Zustand cart state (persisted)
│       └── language-store.ts # Zustand language state (persisted)
├── public/
│   └── images/menu/          # Local menu item images
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages CI/CD pipeline
├── tailwind.config.ts        # Tailwind config with FIT/FAT color tokens
├── next.config.mjs           # Next.js config (static export, basePath)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/JakubKoh/pva.git
cd pva

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for GitHub Pages.

---

## 🌍 Deployment

The project auto-deploys to **GitHub Pages** on every push to `main` via the [deploy workflow](.github/workflows/deploy.yml).

The static site is served at `/pva` base path (configured in `next.config.mjs`).

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero section, FIT/FAT mode switcher, featured items, map, testimonials, CTA |
| Menu | `/menu` | Full menu with FIT/FAT tabs, category images, item cards with add-to-cart |
| Delivery | `/delivery` | Cart summary, delivery address form, payment selection, order placement |
| Locations | `/locations` | Restaurant cards, interactive map, opening hours, delivery zone info |
| 404 | any invalid route | Fun animated 404 page with navigation links |

---

## 👤 Author

**Jakub Koh** — PVA school project
