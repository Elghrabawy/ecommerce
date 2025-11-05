"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const links = {
    repo: "https://github.com/Elghrabawy/ecommerce",
    live: "https://borhom-ecommerce.vercel.app/",
    email: "ibrahim.alghrbawy@gmail.com",
    facebook: "https://www.facebook.com/ebrahim.elghrbawy.35/",
    linkedin: "https://www.linkedin.com/in/borhom/",
    twitter: "https://x.com/borhom_0",
    github: "https://github.com/Elghrabawy"
  };

  const socialIcons = [
    { Icon: Facebook, url: links.facebook, label: "Facebook" },
    { Icon: Linkedin, url: links.linkedin, label: "LinkedIn" },
    { Icon: Twitter, url: links.twitter, label: "Twitter" },
    { Icon: Mail, url: `mailto:${links.email}`, label: "Email" },
    { Icon: Github, url: links.github, label: "GitHub" },
  ];

  return (
    <footer className="bg-primary text-secondary border-t border-white/10 mt-12">
      <div className="container mx-auto px-6 py-8 grid gap-6 md:flex md:items-center md:justify-between">
        {/* Branding */}
        <div className="space-y-2 max-w-md">
          <Link
            href="/"
            className="inline-flex items-baseline gap-2 font-bold text-lg"
          >
            <span className="text-secondary">Borhom</span>
            <span className="text-xs text-slate-400 dark:text-slate-900">E-Commerce</span>
          </Link>

          <p className="text-sm text-slate-400 dark:text-slate-900 leading-relaxed">
            Modern e-commerce frontend built with Next.js, TypeScript &
            shadcn-style UI.
            <span className="hidden sm:inline">
              {" "}
              Fast, accessible & production-ready.
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Buttons */}
          <a
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary/5 hover:bg-secondary/10 px-3 py-1.5 rounded-md text-sm transition border border-white/10"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">Repo</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          {/* Social Icons */}
          {socialIcons.map(({ Icon, url, label }) => (
            <a
              key={label}
              href={url}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition p-2 rounded-md hover:bg-secondary/10"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="py-4 text-center text-xs text-secondar border-t border-secondary/10 w-[90%] mx-auto">
        Built with Next.js & TypeScript • Crafted by{" "}
        <span className="text-secondary font-medium">Borhom</span>.
      </div>
    </footer>
  );
}
