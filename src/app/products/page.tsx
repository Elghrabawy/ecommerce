"use client";

import React, { useEffect, useMemo, useState } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { motion } from "framer-motion";

import type { IProduct, ICategory, IBrand } from "@/interfaces";

import { apiService } from "@/service/apiService";
import {
  ApiProductsParams,
  CategoriesResponse,
  ProductsResponse,
  ViewMode,
} from "@/types";
import {
  ProductCard,
  ProductCardSkeleton,
  Toolbar,
  FiltersSidebar,
  Pagination,
} from "@/components";
import { AppDispatch, StoreType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { findInWishList, toggleWishList } from "@/redux/slices/wishListSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState<string>("-sold");
  const [openMobileFilters, setOpenMobileFilters] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [prodcutsParams, setProductsParams] = useState<ApiProductsParams>({
    page: 1,
  });

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  // Wish list slice
  const wishlist = useSelector((state: StoreType) => state.wishlist.wishList);
  const isWished = (productId: string) => {
    return findInWishList(wishlist, productId);
  };
  const toggleWish = (product: IProduct) => {
    dispatch(toggleWishList(product));
  };

  const updateProductsParams = async (changes: Partial<ApiProductsParams>) => {
    const newProductParams = { ...prodcutsParams, ...changes };
    setProductsParams(newProductParams);

    const newSearchParams = new URLSearchParams();

    console.log("start loop");
    const allowed: Array<keyof ApiProductsParams> = [
      "page",
      "categories",
      "brands",
      "price",
    ];
    Object.entries(newProductParams).forEach(([key, value]) => {
      if (!allowed.includes(key as keyof ApiProductsParams)) return;
      if (value !== undefined && value !== null && value !== "") {
        newSearchParams.set(key, String(value));
      } else {
        newSearchParams.delete(key);
      }
    });
    console.log("end loop", newSearchParams.toString());

    router.replace(`/products?${newSearchParams.toString()}`);
  };

  const resetProductsParams = () => {
    setProductsParams({
      page: 1,
    });

    router.replace(`/products`);
  };

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  const fetchCategories = async () => {
    const response: CategoriesResponse = await apiService.fetchCategories();
    setCategories(response.data);
  };
  const fetchBrands = async () => {
    const response = await apiService.fetchBrands();
    setBrands(response.data);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const productsFilterParams: ApiProductsParams = {};
    let priceMap: Map<"gte" | "lte", number> | undefined;

    params.forEach((value, key) => {
      if (value === null || value === undefined || value === "") return;

      switch (key) {
        case "page":
        case "limit": {
          const n = Number(value);
          if (!Number.isNaN(n)) (productsFilterParams as any)[key] = n;
          break;
        }

        case "sort": {
          const allowed = ["-price", "-createdAt", "-quantity"];
          if (allowed.includes(value))
            productsFilterParams.sort = value as ApiProductsParams["sort"];
          break;
        }

        case "categories":
        case "brands": {
          (productsFilterParams as any)[key] = value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
          break;
        }

        case "keyword": {
          productsFilterParams.keyword = value;
          break;
        }
        case "price[gte]":
        case "price_gte":
        case "minPrice": {
          const n = Number(value);
          if (!Number.isNaN(n)) {
            priceMap = priceMap ?? new Map<"gte" | "lte", number>();
            priceMap.set("gte", n);
          }
          break;
        }

        case "price[lte]":
        case "price_lte":
        case "maxPrice": {
          const n = Number(value);
          if (!Number.isNaN(n)) {
            priceMap = priceMap ?? new Map<"gte" | "lte", number>();
            priceMap.set("lte", n);
          }
          break;
        }

        default:
          break;
      }
    });

    if (priceMap) {
      productsFilterParams.price = priceMap as any;
    }

    setProductsParams((prev) => ({
      ...prev,
      ...(productsFilterParams as Partial<ApiProductsParams>),
    }));

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response: ProductsResponse = await apiService.fetchProducts(
          productsFilterParams
        );
        setProducts(response.data);
        setTotalPages(response.metadata?.numberOfPages ?? 1);
      } catch (err) {
        console.error("fetchProducts error", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const setProductParamsFromUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    const productsFilterParams: ApiProductsParams = {};
    params.forEach((value, key) => {
      if (value === null || value === undefined || value === "") return;
      switch (key) {
        case "page":
        case "limit": {
          const n = Number(value);
          if (!Number.isNaN(n)) (productsFilterParams as any)[key] = n;
          break;
        }

        case "sort": {
          const allowed = ["-price", "-createdAt", "-quantity"];
          if (allowed.includes(value))
            productsFilterParams.sort = value as ApiProductsParams["sort"];
          break;
        }
        case "categories":
        case "brands": {
          (productsFilterParams as any)[key] = value

            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
          break;
        }
        case "keyword": {
          productsFilterParams.keyword = value;
          break;
        }
        default:
          break;
      }
    });
    setProductsParams((prev) => ({
      ...prev,
      ...(productsFilterParams as Partial<ApiProductsParams>),
    }));
  };

  useEffect(() => {
    setProductParamsFromUrl();
    fetchBrands();
    fetchCategories();
  }, []);

  const containerClass = useMemo(
    () =>
      viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
        : "space-y-6",
    [viewMode]
  );

  return (
    <div className="min-h-screen pt-24 pb-16 ">
      <div className="container mx-auto px-4 relative">
        <Toolbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          sort={sort}
          setSort={setSort}
          onOpenFilters={() => setOpenMobileFilters(true)}
          total={products.length}
        />

        <div className="mt-8 flex lg:gap-8">
          <div className="">
            <FiltersSidebar
              openMobile={openMobileFilters}
              setOpenMobile={setOpenMobileFilters}
              categories={categories}
              brands={brands}
              onApplyFilters={() => setOpenMobileFilters(false)}
              onResetFilters={resetProductsParams}
              updateProductsParams={updateProductsParams}
            />
          </div>

          <div className="flex-1">
            <motion.div className={containerClass}>
              {isFirstLoad
                ? Array.from({ length: viewMode === "grid" ? 8 : 4 }).map(
                    (_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none z-20 bg-gradient-to-b from-black/12 to-transparent"
                          initial={{ opacity: 0.18 }}
                          whileInView={{ opacity: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.7, ease: "circOut" }}
                        />
                        <ProductCardSkeleton viewMode={viewMode} />
                      </motion.div>
                    )
                  )
                : products.map((p) => (
                    <motion.div
                      key={p.id || p._id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative"
                    >
                      <ProductCard
                        product={p}
                        viewMode={viewMode}
                        isWished={isWished}
                        toggleWish={toggleWish}
                      />
                    </motion.div>
                  ))}
            </motion.div>

            <Pagination
              page={prodcutsParams.page || 1}
              pages={totalPages}
              onChange={updateProductsParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
