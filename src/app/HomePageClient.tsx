"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  Shield,
  Truck,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { apiService } from "@/service/apiService";

type Category = {
  _id: string;
  name: string;
  image?: string;
};

type Product = {
  id: string | number;
  name: string;
  price: string;
  image?: string;
  rating?: number;
};

export default function HomepageCClient() {
  const [categories, setCategories] = useState<Category[]>([
    {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
    },
    {
      _id: "6439d2d167d9aa4ca970649f",
      name: "Electronics",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png",
    },
    {
      _id: "6439d5b90049ad0b52b90048",
      name: "Men's Fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
    },
    {
      _id: "6439d2f467d9aa4ca97064a8",
      name: "Mobiles",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511156008.png",
    },
  ]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([
    { id: 1, name: "Premium Headphones", price: "$299", image: "/placeholder-product.jpg", rating: 4.8 },
    { id: 2, name: "Smart Watch Pro", price: "$499", image: "/placeholder-product.jpg", rating: 4.9 },
    { id: 3, name: "Wireless Earbuds", price: "$199", image: "/placeholder-product.jpg", rating: 4.7 },
    { id: 4, name: "Laptop Stand", price: "$89", image: "/placeholder-product.jpg", rating: 4.6 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        // attempt to fetch categories via apiService if available
        if (apiService && typeof (apiService as any).getCategories === "function") {
          const res = await (apiService as any).getCategories();
          if (mounted && res?.data && Array.isArray(res.data)) {
            setCategories(res.data);
          }
        }

        // attempt to fetch featured products if api available
        if (apiService && typeof (apiService as any).getFeaturedProducts === "function") {
          const p = await (apiService as any).getFeaturedProducts();
          if (mounted && p?.data && Array.isArray(p.data)) {
            setFeaturedProducts(p.data);
          }
        } else if (apiService && typeof (apiService as any).getProducts === "function") {
          // fallback: small request to get some products
          const p = await (apiService as any).getProducts({ limit: 8 });
          if (mounted && p?.data && Array.isArray(p.data)) {
            setFeaturedProducts(p.data.slice(0, 8).map((x: any) => ({
              id: x._id ?? x.id,
              name: x.title ?? x.name ?? x.slug ?? "Product",
              price: x.price ? `$${x.price}` : x.price || "-",
              image: x.image ?? x.images?.[0] ?? "/placeholder-product.jpg",
              rating: x.rating ?? 0,
            })));
          }
        }
      } catch (err) {
        // keep defaults on error
        // console.error("Homepage fetch error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New Collection</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Shop Smarter,
              <br />
              Live Better
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg h-14 px-8 group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Explore curated selections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?categories=${encodeURIComponent(cat._id)}`}
                className="group relative overflow-hidden rounded-2xl aspect-square border border-border/40 hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full items-center justify-center">
                  <h3 className="text-xl font-bold text-white backdrop-blur-sm px-4 py-2 rounded-md bg-black/30">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black mb-2">Trending Products</h2>
              <p className="text-muted-foreground">Best sellers this week</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-background rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg"
              >
                <div className="aspect-square bg-accent/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    📦
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating ?? "-"}</span>
                  </div>

                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">{product.price}</span>
                    <Button size="sm" className="rounded-full">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">Get 20% Off Your First Order</h2>
            <p className="text-xl text-muted-foreground mb-8">Subscribe to our newsletter</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button size="lg" className="px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```


````tsx
// filepath: [page.tsx](http://_vscodecontentref_/0)
import HomepageCClient from "./homepagecclient";

export default function Home() {
  return <HomepageCClient />;
}