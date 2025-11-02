"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Image from "next/image";
import { motion } from "framer-motion";
import AddToCartButton from "@/components/products/AddToCartButton";
import WishlistButton from "@/components/products/WishlistButton";
import Currency from "../utils/currency";
import { IProduct } from "@/interfaces";

type ProductCardProps = {
  product: IProduct;
  viewMode: "grid" | "list";
  isWished: (productId: string) => boolean;
  toggleWish: (product: IProduct) => void;
};

export function ProductCard({
  product,
  viewMode,
  isWished,
  toggleWish,
}: ProductCardProps) {
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

  // LIST MODE
  if (viewMode === "list") {
    return (
      <article className="flex flex-col sm:flex-row gap-3 bg-secondary/10 border border-border/40 rounded-xl p-3 hover:shadow-md transition shadow-sm">
        <Link
          href={`/products/${product.id}`}
          onClick={startLoader}
          className="flex-shrink-0 w-full sm:w-36"
        >
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-accent/20">
            <Image
              height={400}
              width={400}
              src={product.imageCover}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between flex-1 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              className="font-semibold text-base sm:text-lg line-clamp-2 hover:text-primary"
            >
              {product.title}
            </Link>

            <p className="hidden sm:block text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {product.ratingsAverage?.toFixed(1) ?? "0.0"}
              </span>
              <span className="text-muted-foreground">
                ({product.ratingsQuantity ?? 0})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <span className="font-extrabold text-lg sm:text-2xl">
              <Currency
                value={product.price}
                currency="EGP"
                maximumFractionDigits={0}
              />
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <AddToCartButton
                id={product._id}
                productsCount={product.quantity}
              />
              <WishlistButton
                product={product}
                isWished={isWished}
                toggle={toggleWish}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  // GRID MODE
  return (
    <motion.article
      // layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-xl overflow-hidden bg-secondary/10 h-full border border-border/40 hover:shadow-md transition shadow-sm flex flex-col"
    >
      <div className="relative aspect-square bg-accent/10">
        <Link href={`/products/${product.id}`} onClick={startLoader}>
          <motion.div
            className="absolute inset-0 h-full flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0 relative overflow-hidden"
              >
                <Image
                  height={400}
                  width={400}
                  src={img}
                  alt={product.title + i}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </motion.div>
        </Link>

        <div className="absolute top-2 right-2 bg-white/70 dark:bg-black/40 backdrop-blur-sm p-1.5 rounded-full shadow">
          <WishlistButton
            product={product}
            isWished={isWished}
            toggle={toggleWish}
          />
        </div>

        <div className="absolute left-2 bottom-2 px-2 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow">
          <Currency
            value={product.price}
            currency="EGP"
            maximumFractionDigits={0}
            className="text-secondary"
          />
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium line-clamp-1">
            {product.category?.name}
          </span>
          <span className="text-xs flex items-center gap-1 text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {product.ratingsAverage?.toFixed(1) ?? "0.0"}
          </span>
        </div>
        <span className="h-full flex flex-col justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            onClick={startLoader}
            className="text-sm font-semibold line-clamp-2 hover:text-primary"
          >
            {product.title}
          </Link>

          <AddToCartButton id={product._id} productsCount={product.quantity} />
        </span>
      </div>
    </motion.article>
  );
}
