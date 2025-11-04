"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ---------- Profile Header ----------
function ProfileHeader({ user }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex items-center gap-4 p-6 bg-card rounded-xl border">
      <div className="h-16 w-16 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">
        {initials}
      </div>
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

// ---------- Edit Profile Form ----------
function ProfileForm({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
  });

  return (
    <div className="p-4 border rounded-xl bg-card space-y-4">
      <h3 className="font-semibold text-sm">Edit Profile</h3>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Phone</Label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <Button className="w-full">Save Changes</Button>
    </div>
  );
}

// ---------- Password Form ----------
function PasswordForm() {
  const [pwd, setPwd] = useState({ old: "", new: "" });

  return (
    <div className="p-4 border rounded-xl bg-card space-y-4">
      <h3 className="font-semibold text-sm">Change Password</h3>

      <div className="space-y-2">
        <Label>Current Password</Label>
        <Input
          type="password"
          value={pwd.old}
          onChange={(e) => setPwd({ ...pwd, old: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>New Password</Label>
        <Input
          type="password"
          value={pwd.new}
          onChange={(e) => setPwd({ ...pwd, new: e.target.value })}
        />
      </div>

      <Button className="w-full">Update Password</Button>
    </div>
  );
}

// ---------- Address Card ----------
function AddressCard({ address, onEdit, onRemove }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/40 transition">
      <p className="font-medium">{address.name}</p>
      <p className="text-xs text-muted-foreground">{address.details}</p>

      <div className="flex gap-2 mt-2 text-xs">
        <button className="underline" onClick={() => onEdit(address)}>
          Edit
        </button>
        <button
          className="underline text-red-500"
          onClick={() => onRemove(address._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

// ---------- Address List ----------
function AddressList({ addresses }) {
  const handleEdit = (a) => console.log("Edit", a);
  const handleRemove = (id) => console.log("Remove", id);

  return (
    <div className="p-6 bg-card border rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Addresses</h3>
        <Button size="sm">Add Address</Button>
      </div>

      <div className="space-y-2 max-h-[350px] overflow-auto pr-2">
        {addresses.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No addresses yet.
          </p>
        )}

        {addresses.map((a) => (
          <AddressCard
            key={a._id}
            address={a}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Main Profile Page ----------
export default function ProfilePage() {
  const user = {
    name: "Ibrahim ElGharbawy",
    email: "ibrahim@example.com",
    phone: "+201234567890",
    addresses: [
      {
        _id: "1",
        name: "Home",
        details: "10th of Ramadan, Cairo, Egypt",
      },
      {
        _id: "2",
        name: "Work",
        details: "Nasr City, Cairo, Egypt",
      },
    ],
  };

  return (
    <div className="container max-w-5xl py-10 space-y-6">
      <ProfileHeader user={user} />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <ProfileForm user={user} />
          <PasswordForm />
        </div>

        <div className="md:col-span-2">
          <AddressList addresses={user.addresses} />
        </div>
      </div>
    </div>
  );
}
