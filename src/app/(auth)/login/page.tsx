"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { loginSchema } from "@/schemas/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, IProcessResponse } from "@/interfaces";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (data: ILogin) => {
    setSubmitting(true);
    try {
      const response: IProcessResponse = await login(data);
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 700);
      } else {
        setServerError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setServerError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b">
      <LoginForm />
    </div>
  );
}
