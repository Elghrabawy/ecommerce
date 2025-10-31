"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import type { IProduct } from "@/interfaces";
import Image from "next/image";
import AddToCartButton from "@/components/products/AddToCartButton";
import WishlistButton from "@/components/products/WishlistButton";
import { ViewMode } from "@/types";
import { motion } from "framer-motion";
import Currency, { formatCurrency } from './../currency';



export function ProductCard({
  product,
  viewMode,
  isWished,
  toggleWish,
}: {
  product: IProduct;
  viewMode: ViewMode;
  isWished: (productId: string) => boolean;
  toggleWish: (product: IProduct) => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [product.imageCover, ...(product.images || [])].filter(
    Boolean
  );
  

  useEffect(() => {
    if (viewMode !== "grid") return;
    if (isHovered && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 1200);
      return () => clearInterval(interval);
    }
    setCurrentImage(0);
    
  }, [isHovered, images.length, viewMode]);

  const startLoader = () => NProgress.start();

  // LIST MODE — keep mostly same but refreshed styling
  if (viewMode === "list") {
    return (
      <article className="flex flex-row items-stretch gap-4 group bg-white dark:bg-slate-800 border border-border/40 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
        <Link
          href={`/products/${product.id}`}
          className="block flex-shrink-0"
          onClick={startLoader}
        >
          <div className="w-36 sm:w-44 lg:w-48 aspect-square bg-accent/30 relative overflow-hidden">
            <Image
              height={400}
              width={400}
              src={product.imageCover}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category?.name && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {product.category.name}
                </span>
              )}
              {product.brand?.name && (
                <span className="text-xs text-muted-foreground">
                  {product.brand.name}
                </span>
              )}
            </div>

            <Link
              href={`/products/${product.id}`}
              onClick={startLoader}
              className="font-semibold text-lg line-clamp-2 hover:text-primary block mb-2"
            >
              {product.title}
            </Link>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">
                  {product.ratingsAverage?.toFixed(1) ?? "0.0"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.ratingsQuantity ?? 0})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3">

            <div className="text-2xl font-extrabold">${
              product.priceAfterDiscount ? product.priceAfterDiscount : (product.price ?? 0)
              }</div>
            <div className="flex items-center gap-2">
              <div className="w-[150px]">
                <AddToCartButton
                  id={product._id}
                  productsCount={product.quantity}
                />
              </div>
              <WishlistButton product={product} isWished={isWished} toggle={toggleWish} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  // GRID MODE — redesigned card
  return (
    <motion.article
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full flex flex-col rounded-2xl group overflow-hidden bg-white dark:bg-slate-800 border border-border/40 hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square bg-accent/10 overflow-hidden ">
        <Link
          href={`/products/${product.id}`}
          onClick={startLoader}
          className="block "
        >
          <motion.div
            className="absolute inset-0 h-full flex transition-transform duration-500"
            style={{
              width: `100%`,
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-full flex-shrink-0 overflow-hidden animation-all duration-400 group-hover:scale-105 "
              >
                <Image
                  height={400}
                  width={400}
                  src={img}
                  alt={product.title + "-" + idx}
                  className="object-cover w-full h-full transition-transform duration-700 ease-out"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </Link>

        {/* top-right actions */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <div className="backdrop-blur-smt bg-white/60 dark:bg-black/40 rounded-full flex justify-center p-1.5 shadow-sm">
            <WishlistButton product={product} isWished={isWished} toggle={toggleWish} />
          </div>
        </div>

        {/* price badge bottom-left */}
        <div className="absolute left-3 bottom-3 z-20">
          <div className="px-3 py-1 rounded-full bg-primary text-white font-bold shadow-lg">
            {/* {product.price} L.E */}
            <Currency value={product.price} currency="EGP" maximumFractionDigits={0}/>
          </div>
        </div>

        {/* dots */}
        {images.length > 1 && (
          <div
            className={`${
              isHovered ? "opacity-100" : "opacity-0"
            } absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 transition-opacity duration-300`}
          >
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImage
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-secondary/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {product.category?.name && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {product.category.name}
                </span>
              )}
              {product.brand?.name && (
                <span className="text-xs text-muted-foreground">
                  {product.brand.name}
                </span>
              )}
            </div>

            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {product.ratingsAverage?.toFixed(1) ?? "0.0"}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.ratingsQuantity ?? 0})
              </span>
            </div>
          </div>

          <Link
            href={`/products/${product.id}`}
            onClick={startLoader}
            className="font-semibold line-clamp-2 hover:text-primary"
          >
            {product.title}
          </Link>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="items-center gap-3 w-full">
            <AddToCartButton
              id={product._id}
              productsCount={product.quantity}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
