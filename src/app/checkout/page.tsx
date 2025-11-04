"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, StoreType } from "@/redux/store";
import { fetchCart as fetchCartThunk } from "@/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { apiService } from "@/service/apiService";
import type { ICartData } from "@/interfaces";
import {
  Loader2,
  Plus,
  Edit2,
  MapPin,
  Star,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddressDialog from "@/components/checkout/AddressDialog";
import type { IShippingAddress } from "@/interfaces";
import NProgress from "nprogress";
import { Badge } from "@/components/ui/badge";
import Currency from "@/components/utils/currency";
import AddressCard from "@/components/AddressCard";

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
} as const;
const addressesContainer = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
} as const;

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // select cart from store
  const cart: ICartData | null = useSelector(
    (s: StoreType) => s.cart?.cart?.cart ?? null
  );

  const items = cart?.products ?? [];
  const itemsTotal = cart?.totalCartPrice ?? 0;
  const shipping = 0;
  const orderTotal = itemsTotal + shipping;

  const [addresses, setAddresses] = useState<IShippingAddress[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [showAddresses, setShowAddresses] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCartThunk());
    handleFetchAddresses();
    NProgress.done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchAddresses = async () => {
    try {
      const response = await apiService.getAddresses();
      if (response?.data) {
        setAddresses(response.data);
        setSelectedAddressIndex(response.data.length ? 0 : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cardCheckout = async (address: IShippingAddress) => {
    if (!cart) return;
    const response = await apiService.checkoutSession(cart._id, address);
    if (response?.session?.url) {
      location.href = response.session.url;
    }
  };

  const cashCheckout = async (address: IShippingAddress) => {
    if (!cart) return;
    const response = await apiService.checkoutOnDelivery(cart._id, address);
    if (response?.status === "success") {
      router.push("/allorders");
    } else {
      setServerError("Failed to place order.");
    }
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (idx: number) => {
    setEditingIndex(idx);
    console.log("editing index:", idx);
    console.log("editing address:", addresses[idx]);
    setIsModalOpen(true);
  };

  const handleSelectAddress = (idx: number | null) => {
    if (idx === null) {
      openAddModal();
      return;
    }
    setSelectedAddressIndex(idx);
    setShowAddresses(false);
  };

  const handleRemoveAddress = async (id: string) => {
    setAddresses(prev => prev.filter(addr => addr._id !== id));
    const response = await apiService.deleteAddress(id);
    if(response?.status === "success") {
      setAddresses(response?.data);
    }
  }

  const handlePlaceOrder = async () => {
    if (!cart || !cart.products || cart.products.length === 0) {
      setServerError("Cart is empty.");
      return;
    }

    const chosen: IShippingAddress | null =
      selectedAddressIndex !== null && addresses[selectedAddressIndex]
        ? addresses[selectedAddressIndex]
        : null;

    if (!chosen) {
      setServerError("Please select or add an address.");
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      const shippingAddress: IShippingAddress = {
        name: chosen.name,
        details: chosen.details,
        phone: chosen.phone,
        city: chosen.city,
        _id: chosen._id,
      } as IShippingAddress;

      if (paymentMethod === "card") {
        await cardCheckout(shippingAddress);
      } else {
        await cashCheckout(shippingAddress);
      }

      setPaid(true);
      return;
    } catch (err: unknown) {
      console.error(err);
      let message = "Failed to place order.";
      if (err && typeof err === "object" && "message" in err) {
        message = String((err as { message?: unknown }).message ?? message);
      } else if (typeof err === "string") {
        message = err;
      }
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const selectedAddressSummary: IShippingAddress = selectedAddressIndex !== null && addresses[selectedAddressIndex]
    ? addresses[selectedAddressIndex]
    : ({ name: "", details: "", city: "", phone: "" } as IShippingAddress);

  return (
    <div className="min-h-screen py-12 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Finalize your order. Choose shipping address, payment and confirm items.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left: Shipping & items */}
          <section className="lg:col-span-2 space-y-4">
            <motion.div layout className="p-4 rounded-2xl shadow-lg border">
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-lg">Shipping address</h2>
                <div className="flex items-center gap-3">
                  <button
                    className="text-sm text-primary underline"
                    onClick={() => setShowAddresses((s) => !s)}
                  >
                    {showAddresses ? "Hide addresses" : "Show all addresses"}
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm px-2 py-1 border rounded hover:bg-primary/2.5"
                    onClick={openAddModal}
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              </div>

              {/* selected / default address summary */}
              <div className="mb-3 p-4 rounded-lg border bg-secondary/5 mt-4 flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{selectedAddressSummary.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{selectedAddressSummary.details}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {selectedAddressSummary.city} • {selectedAddressSummary.phone}
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="ghost" onClick={() => setShowAddresses(true)}>
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              {/* animated addresses list - expands height when opened */}
              <AnimatePresence initial={false}>
                {showAddresses && (
                  <motion.div
                    layout
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={addressesContainer}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <motion.ul className="space-y-3 mt-2">
                      {addresses.map((a, idx) => (
                          <motion.li
                          key={a._id ?? idx}
                          layout
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ duration: 0.25, delay: idx * 0.03 }}
                          onClick={() => handleSelectAddress(idx)}
                        >
                          <AddressCard
                            address={a}
                            selected={selectedAddressIndex === idx}
                            onEdit={() => openEditModal(idx)}
                            onRemove={() => handleRemoveAddress(a._id!)}
                          />
                        </motion.li>
                      ))}

                      <motion.li
                        layout
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="p-3 rounded-lg cursor-pointer border bg-secondary/20 hover:bg-secondary"
                        onClick={() => handleSelectAddress(null)}
                      >
                        <div className="flex items-center justify-between ">
                          <div>
                            <div className="font-medium">Use a different address</div>
                            <div className="text-xs text-muted-foreground">Add a new address in a popup</div>
                          </div>
                          <div className="text-sm text-primary">Add</div>
                        </div>
                      </motion.li>
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div layout className="p-4 rounded-2xl shadow-lg border">
              <h2 className="font-semibold mb-3 text-lg">Order items</h2>
              {items.length === 0 ? (
                <div className="text-sm text-muted-foreground">Your cart is empty.</div>
              ) : (
                <motion.ul layout className="space-y-3">
                  {items.map((it, i) => {
                    const subtotal = (it.price ?? 0) * (it.count ?? 0);
                    return (
                      <motion.li
                        key={it._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-4 p-3 rounded-lg border bg-secondary/5 hover:shadow-md"
                      >
                        <img src={it.product.imageCover} alt={it.product.title} className="h-20 w-20 rounded object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-sm truncate">{it.product.title}</div>
                                <div className="text-xxs text-muted-foreground ml-2">
                                  {it.product.category?.name ? `· ${it.product.category.name}` : ""}
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 truncate">{it.product.brand?.name}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Star className="h-4 w-4 text-amber-400" />
                                <div className="text-xs text-muted-foreground">{it.product.ratingsAverage ?? "—"} ({it.product.ratingsQuantity ?? 0})</div>
                                {it.product.priceAfterDiscount && <div className="text-xxs px-2 py-0.5 rounded bg-rose-50 text-rose-600 ml-2">Sale</div>}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-semibold">
                                <Currency value={it.price ?? 0} currency="EGP" maximumFractionDigits={2} />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">Count: {it.count}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-xs text-muted-foreground truncate">
                              {it.product.description ? `${it.product.description.slice(0, 120)}${it.product.description.length > 120 ? "…" : ""}` : ""}
                            </div>
                            <div className="text-sm font-semibold">
                              <Currency value={subtotal} currency="EGP" maximumFractionDigits={2} />
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </motion.div>
          </section>

          {/* right: Summary + payment */}
          <aside className="space-y-4">
            <motion.div layout className="p-4 rounded-2xl shadow-lg border">
              <h3 className="font-semibold mb-3 text-lg">Order summary</h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <div className="flex justify-between">
                  <span>Items subtotal</span>
                  <Currency value={itemsTotal} currency="EGP" maximumFractionDigits={2} />
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping.toLocaleString()} L.E</span>
                </div>

                <div className="border-t mt-3 pt-3 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl">
                    <Currency value={orderTotal} currency="EGP" maximumFractionDigits={2} />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div layout className="p-4 rounded-2xl shadow-lg border">
              {/* payment moved here */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Payment method</h4>
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-2 rounded-lg border ${paymentMethod === "card" ? "ring-2 ring-primary/30 bg-secondary/40" : "hover:bg-secondary/20"}`}
                  >
                    <input type="radio" name="payment-right" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                    <div>
                      <div className="font-medium">Card</div>
                      <div className="text-xs text-muted-foreground">Pay securely with your card</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-2 rounded-lg border ${paymentMethod === "cash" ? "ring-2 ring-primary/30 bg-secondary/40" : "hover:bg-secondary/20"}`}
                  >
                    <input type="radio" name="payment-right" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
                    <div>
                      <div className="font-medium">Cash on delivery</div>
                      <div className="text-xs text-muted-foreground">Pay when the order arrives</div>
                    </div>
                  </label>
                </div>
              </div>

              {serverError && <div className="text-sm text-red-600 mb-2">{serverError}</div>}

              <Button className="w-full" onClick={handlePlaceOrder} disabled={loading || items.length === 0}>
                {paid ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Order Placed{" "}
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Placing order...
                  </>
                ) : (
                  "Place order"
                )}
              </Button>

              <Button variant="ghost" className="w-full mt-3" onClick={() => router.push("/cart")}>
                Back to cart
              </Button>
            </motion.div>
          </aside>
        </div>
      </div>

      <AddressDialog editedAddress={editingIndex != null ? addresses[editingIndex] : null} open={isModalOpen} onOpenChange={setIsModalOpen} setAddresses={setAddresses}/>
    </div>
  );
}
