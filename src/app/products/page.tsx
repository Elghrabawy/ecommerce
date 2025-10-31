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
import { fetchCart } from "@/redux/slices/cartSlice";
import {
  fetchWishList,
  findInWishList,
  toggleWishList,
} from "@/redux/slices/wishListSlice";
import LoginDialog from "@/components/auth/loginDialog";

export default function ProductsPage() {
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

  const updateProductsParams = (changes: Partial<ApiProductsParams>) => {
    setProductsParams((prev) => ({ ...prev, ...changes }));
  };
  const resetProductsParams = () => {
    setProductsParams({
      page: 1,
    });
  };

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response: ProductsResponse = await apiService.fetchProducts(
        prodcutsParams
      );
      setProducts(response.data);
      setTotalPages(response.metadata.numberOfPages);
      setIsLoading(false);
      setIsFirstLoad(false);
    };

    fetchProducts();
  }, [prodcutsParams]);



  useEffect(() => {
    const fetchCategories = async () => {
      const response: CategoriesResponse = await apiService.fetchCategories();
      setCategories(response.data);
    };
    const fetchBrands = async () => {
      const response = await apiService.fetchBrands();
      setBrands(response.data);
    };

    dispatch(fetchWishList());
    dispatch(fetchCart());

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

        <div className="mt-8 flex gap-8 ">
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
                        {/* reveal shade that fades away as the card comes into view */}
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
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none z-20 bg-gradient-to-b from-black/12 to-transparent"
                        initial={{ opacity: 0.18 }}
                        whileInView={{ opacity: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "circOut" }}
                      />
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
