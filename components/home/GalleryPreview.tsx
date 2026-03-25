"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://img05.restaurantguru.com/r5c7-Le-Pecheur-interior-2022-10-11.jpg",
    label: "L'Intérieur",
    span: "tall",
  },
  {
    src: "https://img05.restaurantguru.com/r706-Le-Pecheur-meals-2025-10.jpg",
    label: "Plats du Chef",
    span: "normal",
  },
  {
    src: "https://img05.restaurantguru.com/r2fb-Le-Pecheur-paella-2025-10.jpg",
    label: "Paella Maison",
    span: "normal",
  },
  {
    src: "https://img05.restaurantguru.com/r151-spaghetti-bolognese-Le-Pecheur-2025-10.jpg",
    label: "Spaghetti Fruits de Mer",
    span: "wide",
  },
  {
    src: "https://img05.restaurantguru.com/r0b0-Le-Pecheur-design-2022-10-10.jpg",
    label: "L'Ambiance",
    span: "normal",
  },
  {
    src: "https://img.restaurantguru.com/rbc8-dining-table-Le-pecheur.jpg",
    label: "La Terrasse",
    span: "normal",
  },
];

export default function GalleryPreview() {
  return (
    <section className="py-32 px-6 bg-primary-dark text-primary-light relative overflow-hidden">
      {/* Subtle dark texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(212,175,122,0.08) 0px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-10 bg-accent-gold/60" />
              <h3 className="text-accent-gold font-accent text-2xl italic">L&apos;Ambiance</h3>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-none italic font-accent text-primary-light">
              Vivez<br />
              <span className="text-shimmer">l&apos;Instant.</span>
            </h2>
            <p className="max-w-sm text-base opacity-50 font-body leading-relaxed">
              Une immersion entre ciel et mer, où chaque détail est pensé pour votre confort.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/galerie"
              className="group inline-flex items-center gap-3 border border-white/20 rounded-full px-7 py-4 text-white font-heading text-lg hover:bg-accent-gold hover:border-accent-gold hover:text-primary-dark transition-all duration-400"
            >
              <span>Explorer la galerie</span>
              <ArrowUpRight size={20} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric premium grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[260px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={[
                "relative rounded-[2rem] overflow-hidden cursor-pointer group border border-white/5",
                img.span === "tall"  ? "row-span-2" : "",
                img.span === "wide"  ? "col-span-2" : "",
              ].join(" ")}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-108"
                unoptimized
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <span className="text-white font-heading font-semibold text-sm tracking-wide opacity-80 group-hover:opacity-100">
                  {img.label}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Gold corner accent on featured card */}
              {index === 0 && (
                <div className="absolute top-5 left-5">
                  <span className="bg-accent-gold/90 backdrop-blur-sm text-primary-dark px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    À la Une
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
