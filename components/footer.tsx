"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Tracking", href: "/track" },
        { label: "Services", href: "/#services" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "Contact", href: "/#contact" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid md:grid-cols-4 gap-8 mb-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                className="w-8 h-8 bg-secondary-foreground rounded-lg flex items-center justify-center"
              >
                <span className="text-secondary font-bold text-sm">TS</span>
              </motion.div>
              <span className="font-bold text-lg">Track-Ship</span>
            </div>

            <p className="text-sm opacity-80">
              Your trusted partner for professional logistics and shipping
              solutions.
            </p>
          </motion.div>

          {footerLinks.map((section) => (
            <motion.div
              key={section.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45 }}
            >
              <h4 className="font-semibold mb-4">{section.title}</h4>

              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        href={link.href}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="bg-secondary-foreground/20 mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80"
        >
          <p>&copy; {currentYear} Track-Ship. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "Facebook"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="#" className="hover:opacity-100">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
