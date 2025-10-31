"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IShippingAddress } from "@/interfaces/order";
import { apiService } from "@/service/apiService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas/AddressSchema";
import LoginForm from "@/app/(auth)/login/LoginForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingIndex: number | null;
  setAddresses: React.Dispatch<React.SetStateAction<IShippingAddress[]>>;
}

export default function AddressDialog({
  open,
  onOpenChange,
  editingIndex,
  setAddresses,
}: Props) {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleAddAddress = async (data: IShippingAddress) => {
    setSubmitting(true);
    const response = await apiService.addAddress(data);
    if (response?.data) {
      setSuccess(true);
      onSuccess();
      setAddresses(response.data);
    }
    setSubmitting(false);
    return response;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      details: "",
    },
    resolver: zodResolver(addressSchema),
  });

  const onSuccess = () => {
    setTimeout(() => {
      setSuccess(false);
      onOpenChange(false);
      reset({
        name: "",
        phone: "",
        city: "",
        details: "",
      });
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="bg-secondary">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                {editingIndex === null ? "Add address" : "Edit address"}
              </DialogTitle>
            </div>

            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Enter recipient information and save.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            <label className="block">
              <div className="text-xs text-muted-foreground mb-1">Phone</div>
              <Input {...register("phone")} placeholder="0101xxxxxxx" />
              {errors.phone?.message && (
                <div className="flex items-center gap-2 text-xs text-red-600 p-1">
                  <>{errors.phone.message}</>
                </div>
              )}
            </label>

            <label className="block">
              <div className="text-xs text-muted-foreground mb-1">Name</div>
              <Input {...register("name")} placeholder="Recipient name" />
              {errors.name?.message && (
                <div className="flex items-center gap-2 text-xs text-red-600 p-1">
                  <>{errors.name.message}</>
                </div>
              )}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1">City</div>
                <Input {...register("city")} placeholder="City" />
                {errors.city?.message && (
                  <div className="flex items-center gap-2 text-xs text-red-600 p-1">
                    <>{errors.city.message}</>
                  </div>
                )}
              </label>
              <label className="block">
                <div className="text-xs text-muted-foreground mb-1">
                  details
                </div>
                <Input
                  {...register("details")}
                  placeholder="Building, street, notes..."
                />
                {errors.details?.message && (
                  <div className="flex items-center gap-2 text-xs text-red-600 p-1">
                    <>{errors.details.message}</>
                  </div>
                )}
              </label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <div className="flex items-center gap-2 w-full">
              <Button
                className="flex-1"
                disabled={submitting || success}
                onClick={handleSubmit((data) => {
                  handleAddAddress(data);
                })}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" /> Loading...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Done
                  </>
                ) : (
                  "Add"
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
