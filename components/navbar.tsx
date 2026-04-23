"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? "bg-background/80 backdrop-blur" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <span className="text-primary-foreground font-bold text-lg">
                TS
              </span>
            </motion.div>

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-bold text-xl text-foreground"
            >
              Track-Ship
            </motion.span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/#home" },
              { label: "Services", href: "/#services" },
              { label: "About", href: "/#about" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <motion.div key={item.href} whileHover="hover">
                <Link
                  href={item.href}
                  className="relative text-foreground transition-colors"
                >
                  {item.label}

                  {/* underline animation */}
                  <motion.span
                    variants={{
                      hover: { width: "100%" },
                    }}
                    initial={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Button className="bg-primary hover:bg-accent text-primary-foreground">
              <Link href="/track">Track Shipment</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
