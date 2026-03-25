"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const navLinks = [
  { name: "Accueil",      href: "/" },
  { name: "Le Menu",      href: "/menu" },
  { name: "Galerie",      href: "/galerie" },
  { name: "Réservations", href: "/reservation" },
  { name: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLightPage = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !isScrolled;
  // Subpages also start with a dark header in this design, so they need white text at the top
  const textColor = isScrolled ? "text-primary-dark" : "text-white";
  const bgClass = isScrolled
    ? "bg-white/90 backdrop-blur-xl shadow-sm py-3 border-b border-primary-dark/5"
    : "bg-transparent py-6";

  return (
    <nav className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-400 px-6", bgClass)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className={cn(
            "text-2xl md:text-3xl font-heading font-bold tracking-[0.18em] leading-none uppercase transition-colors duration-300",
            textColor
          )}>
            Le Pêcheur
          </span>
          <span className="text-[9px] text-accent-gold font-accent tracking-[0.5em] uppercase mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            Ezzahra · Depuis 1998
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative font-heading text-[1.05rem] group py-2 transition-colors duration-300",
                  textColor,
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                )}
              >
                <span>{link.name}</span>
                {/* Underline — gold for active, thin for hover */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-accent-gold transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}

            <Link
              href="/reservation"
              className={cn(
                "px-7 py-2.5 rounded-full font-heading text-base shadow-md transition-all duration-300 hover:scale-105 active:scale-95",
                isTransparent
                  ? "bg-white text-primary-dark hover:bg-accent-gold hover:text-primary-dark"
                  : "bg-primary-dark text-white hover:bg-accent-gold hover:text-primary-dark"
              )}
            >
            Réserver
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn("md:hidden transition-colors duration-300", textColor)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-primary-light border-t border-primary-dark/8 px-6 py-8 flex flex-col gap-5 md:hidden shadow-deep"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-heading text-2xl transition-colors",
                    isActive ? "text-accent-gold" : "text-primary-dark hover:text-accent-gold"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/reservation"
              className="btn-primary text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Réserver une Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
