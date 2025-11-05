# 🛍️ E-Commerce Frontend (Next.js + TypeScript)

Live Demo: https://borhom-ecommerce.vercel.app/

A modern **frontend-only e-commerce application** built with **Next.js App Router**, **TypeScript**, and a **scalable component architecture**.  
Supports product browsing, categories, cart, wishlist, checkout UI, authentication UI, and user profile pages.

---

## 🚀 Features Overview

✔️ Product listing & category pages  
✔️ Product details page  
✔️ Cart & Wishlist (persistent with Redux)  
✔️ Checkout UI with address forms  
✔️ Authentication UI (login & register)  
✔️ Profile & order-related screens  
✔️ Responsive UI (Desktop & Mobile)  
✔️ Toast alerts, modals, animations  
✔️ Server + client component architecture  

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|---------|
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS |
| UI System | shadcn-style custom components |
| State Mgmt | Redux Toolkit (cart & wishlist) + AuthContext |
| Forms | `react-hook-form` + `zod` |
| Images | `next/image` |
| API Client | Axios via `apiService.ts` |
| Animations | Framer Motion |
| Notifications | Sonner |
| Icons | lucide-react |

---

## 📂 Project Structure (High Level)

```bash
src/
 ├─ app/                # Pages (server & client components)
 ├─ components/
 │   ├─ ui/             # Reusable UI primitives (shadcn-style)
 │   ├─ home/           # Homepage carousel & UI parts
 │   └─ products/       # Product cards, filters, pagination
 ├─ context/            # AuthContext + providers
 ├─ redux/              # Store & slices (cart, wishList)
 ├─ service/            # apiService.ts (API abstraction)
 ├─ interfaces/         # TS types
 └─ schemas/            # zod validation schemas
