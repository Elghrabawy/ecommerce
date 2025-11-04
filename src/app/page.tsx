"use server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  Star,
  Sparkles,
  PackagePlus,
} from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/interfaces";
import { apiService } from "@/service/apiService";
import ItemsCarousl from "@/components/home/ItemsCarousl";
import Currency from "@/components/utils/currency";

export default async function Home() {
  let categories: ICategory[] = [
    {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      slug: "women's-fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
      createdAt: "2023-04-14T22:36:58.118Z",
      updatedAt: "2023-04-14T22:36:58.118Z",
    },
    {
      _id: "6439d2d167d9aa4ca970649f",
      name: "Electronics",
      slug: "electronics",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png",
      createdAt: "2023-04-14T22:25:21.783Z",
      updatedAt: "2023-04-14T22:25:21.783Z",
    },
    {
      _id: "6439d5b90049ad0b52b90048",
      name: "Men's Fashion",
      slug: "men's-fashion",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
      createdAt: "2023-04-14T22:37:45.627Z",
      updatedAt: "2023-04-14T22:37:45.627Z",
    },
    {
      _id: "6439d2f467d9aa4ca97064a8",
      name: "Mobiles",
      slug: "mobiles",
      image:
        "https://ecommerce.routemisr.com/Route-Academy-categories/1681511156008.png",
      createdAt: "2023-04-14T22:25:56.071Z",
      updatedAt: "2023-04-14T22:25:56.071Z",
    },
  ];

  try {
    const response = await apiService.fetchCategories();
    if (response?.data?.length) {
      categories = response.data as ICategory[];
    }
  } catch {}

  let products = null;

  try {
    const response = await apiService.fetchProducts({
      limit: 4,
      sort: "-ratingsAverage",
    });
    if (!response?.data) throw new Error("No products found");
    products = response.data;
  } catch {
    products = [
      {
        _id: "6428ebc6dc1175abc65ca0b9",
        title: "Woman Shawl",
        price: 191,
        imageCover:
          "https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg",
        ratingsAverage: 4.8,
      },
      {
        _id: "6428c320dc1175abc65ca008",
        title: "Crew Neck Long Sleeve Men's Knitwear Sweater",
        price: 449,
        priceAfterDiscount: 330,
        imageCover:
          "https://ecommerce.routemisr.com/Route-Academy-products/1680392991271-cover.jpeg",
        ratingsAverage: 4.7,
      },
      {
        _id: "6408e1266406cd15828e8f1c",
        title: "PS5 DualSense Charging Station",
        price: 1045,
        imageCover:
          "https://ecommerce.routemisr.com/Route-Academy-products/1678303526206-cover.jpeg",

        ratingsAverage: 4.3,
      },
      {
        _id: "6408d6626406cd15828e8ef2",
        title:
          "IdeaPad Gaming 3 15IHU6 Laptop With 15.6-inch Display / Intel Core i7-11370H Processor /16GB RAM / 512GB SSD / Nvidia GeForce RTX 3050 4GB Series / DOS / English/Arabic Shadow Black",
        price: 29699,
        imageCover:
          "https://ecommerce.routemisr.com/Route-Academy-products/1678300769642-cover.jpeg",
        ratingsAverage: 4.8,
      },
    ];
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">New Collection 2024</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Shop Smarter,
              <br />
              Live Better
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Your one-stop shop
              for everything you need.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg h-14 px-8 group">
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg h-14 px-8"
              >
                <Link href="/products">View Products</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary">
                  4.9
                </div>
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
          <h2 className="text-4xl font-black text-center mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On orders over $50",
              },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Zap, title: "Fast Delivery", desc: "2-3 business days" },
              {
                icon: Star,
                title: "Quality Products",
                desc: "Guaranteed satisfaction",
              },
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

      {/* Categories Carousel */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg">
              Explore curated selections
            </p>
          </div>

          <div className="w-full">
            <ItemsCarousl categories={categories} />
            {/* <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {categories.map((cat) => (
                  <CarouselItem
                    key={cat._id}
                    className="basis-1/2 md:basis-1/4"
                  >
                    <Link
                      href={`/products?categories=${encodeURIComponent(
                        cat._id
                      )}`}
                      className="group relative overflow-hidden rounded-2xl aspect-square border border-border/40 hover:shadow-lg transition-shadow block"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="relative z-10 flex h-full items-center justify-center">
                        <h3 className="text-xl font-bold text-white backdrop-blur-sm px-4 py-2 rounded-md bg-black/30">
                          {cat.name}
                        </h3>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel> */}
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
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-background rounded-2xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all hover:shadow-lg"
              >
                <div className="aspect-square bg-accent/50 relative overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.title || "Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    📦
                  </div> */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Hot
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors  line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black">
                      <Currency value={product.priceAfterDiscount ?? product.price}  currency={"EGP"}/>
                      {/* {product.priceAfterDiscount != null && (
                        <span className="ml-1 line-through text-muted-foreground font-medium text-sm">
                          {product.price}
                        </span>
                      )} */}
                    </span>

                    <Button
                      size="sm"
                      className="rounded-full"
                      area-label="Add to cart"
                    >
                      <PackagePlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready to start shopping?
              </h3>
              <p className="text-muted-foreground">
                Join thousands of happy customers
              </p>
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
  );
}
