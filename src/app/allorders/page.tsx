"use client";

import React, { useEffect, useState } from "react";
import { apiService } from "@/service/apiService";
import type { IOrder } from "@/interfaces/order";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import OrderCard from "@/components/orders/OrderCard";
import { format } from "date-fns";
import NProgress from "nprogress";

export default function AllOrderesPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 40;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: IOrder[] = await apiService.getUserOrderes("68f95707a20df420ac88385a");
      setOrders(res || []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders().then(() => { NProgress.done(); });
  }, []);

  const start = (page - 1) * limit + 1;
  const end = start + (orders.length ? orders.length - 1 : 0);

  return (
    <div className="min-h-screen py-16 pt-26">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">All Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {orders.length ? `${start} — ${end}` : "0"} orders
            </p>
          </div>
        </header>

        <main>
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-800/20 p-4 text-sm text-red-700">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-sm text-muted-foreground">No orders found.</div>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}