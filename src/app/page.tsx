"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  ShoppingBag, 
  Zap, 
  Shield, 
  Truck, 
  Star,
  TrendingUp,
  Sparkles
} from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featuredProducts = [
    { id: 1, name: "Premium Headphones", price: "$299", image: "/placeholder-product.jpg", rating: 4.8 },
    { id: 2, name: "Smart Watch Pro", price: "$499", image: "/placeholder-product.jpg", rating: 4.9 },
    { id: 3, name: "Wireless Earbuds", price: "$199", image: "/placeholder-product.jpg", rating: 4.7 },
    { id: 4, name: "Laptop Stand", price: "$89", image: "/placeholder-product.jpg", rating: 4.6 },
  ]

  const categories = [
    { name: "Electronics", icon: "⚡", color: "from-blue-500 to-cyan-500" },
    { name: "Fashion", icon: "👔", color: "from-pink-500 to-purple-500" },
    { name: "Home & Living", icon: "🏠", color: "from-orange-500 to-red-500" },
    { name: "Sports", icon: "⚽", color: "from-green-500 to-emerald-500" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div 
            className="absolute inset-0 opacity-30"
           
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New Collection 2024</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              Shop Smarter,
              <br />
              Live Better
            </h1>

            {/* Subheading */}
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"

            >
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"

            >
              <Button asChild size="lg" className="text-lg h-14 px-8 group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                <Link href="/deals">
                  View Deals
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Zap, title: "Fast Delivery", desc: "2-3 business days" },
              { icon: Star, title: "Quality Products", desc: "Guaranteed satisfaction" },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-background border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg hover:-translate-y-2"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">Explore our wide range of products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl aspect-square"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                <div className="relative h-full flex flex-col items-center justify-center text-white">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Hot
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
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

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Get 20% Off Your First Order
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter and get exclusive deals and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to start shopping?</h3>
              <p className="text-muted-foreground">Join thousands of happy customers</p>
            </div>
            <Button asChild size="lg" className="group">
              <Link href="/products" className="flex items-center gap-2">
                Browse Products
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}