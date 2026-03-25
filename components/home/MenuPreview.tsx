"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const featuredItems = [
  {
    num: "01",
    name: "Dorade Royale Grillée",
    description: "Fraîchement pêchée, grillée au feu de bois avec herbes méditerranéennes et citron confit.",
    price: "45 DT",
    image: "https://img05.restaurantguru.com/r482-Le-Pecheur-meals-2025-10-2.jpg",
    badge: "Populaire",
  },
  {
    num: "02",
    name: "Paella Fruits de Mer",
    description: "Le classique méditerranéen revisité avec calamars frais, crevettes royales et moules.",
    price: "42 DT",
    image: "https://img05.restaurantguru.com/r2fb-Le-Pecheur-paella-2025-10.jpg",
    badge: "Chef's Choice",
  },
  {
    num: "03",
    name: "Spaghetti aux Fruits de Mer",
    description: "Spécialité italienne revisitée avec les saveurs intenses de la Méditerranée.",
    price: "32 DT",
    image: "https://img05.restaurantguru.com/r505-Le-Pecheur-dessert-2022-10-2.jpg",
    badge: "Incontournable",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-32 px-6 bg-primary-light relative overflow-hidden">
      {/* Decorative large number watermark */}
      <div
        className="absolute top-24 right-0 text-[220px] font-heading font-bold leading-none text-primary-dark/[0.025] pointer-events-none select-none translate-x-1/4"
        aria-hidden
      >
        MENU
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-10 bg-accent-gold/50" />
              <h3 className="text-accent-gold font-accent text-2xl italic">L&apos;Assiette du Jour</h3>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.0]">
              Suggestions<br />du Chef.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 text-primary-dark font-heading text-lg border border-primary-dark/15 rounded-full px-7 py-4 hover:bg-primary-dark hover:text-primary-light hover:border-primary-dark transition-all duration-400"
            >
              <span>Découvrir toute la carte</span>
              <ArrowUpRight size={20} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-deep transition-all duration-500 hover:-translate-y-1 border border-primary-dark/[0.04]"
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-800"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-md text-primary-dark px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                    {item.badge}
                  </span>
                </div>

                {/* Gold number — top right */}
                <div className="absolute top-5 right-5">
                  <span className="text-white/20 font-heading font-bold text-5xl leading-none select-none group-hover:text-accent-gold/50 transition-colors duration-500">
                    {item.num}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-3">
                {/* Gold accent line */}
                <div className="h-[2px] w-8 bg-accent-gold/40 group-hover:w-16 transition-all duration-500" />

                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-heading font-bold max-w-[72%] leading-tight group-hover:text-accent-gold transition-colors duration-300">
                    {item.name}
                  </h4>
                  <span className="font-heading font-bold text-xl text-accent-gold">{item.price}</span>
                </div>

                <p className="text-primary-dark/55 font-body text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
