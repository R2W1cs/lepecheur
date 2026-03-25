"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const galleryImages = [
  { src: "https://img05.restaurantguru.com/r5c7-Le-Pecheur-interior-2022-10-11.jpg", title: "Salle Principale", category: "Ambiance" },
  { src: "https://img05.restaurantguru.com/r706-Le-Pecheur-meals-2025-10.jpg", title: "Spécialités de la Mer", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/r2fb-Le-Pecheur-paella-2025-10.jpg", title: "Paella Royale", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/r151-spaghetti-bolognese-Le-Pecheur-2025-10.jpg", title: "Spaghetti Fruits de Mer", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/r0b0-Le-Pecheur-design-2022-10-10.jpg", title: "Décoration & Design", category: "Ambiance" },
  { src: "https://img.restaurantguru.com/rbc8-dining-table-Le-pecheur.jpg", title: "Dîner au Bord de l'Eau", category: "Ambiance" },
  { src: "https://img05.restaurantguru.com/rdd0-Le-Pecheur-spaghetti-bolognese-2025-10.jpg", title: "Pâtes Fraîches", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/r4cc-Le-Pecheur-dishes-2022-10-9.jpg", title: "Variété Tunisienne", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/rec5-Le-Pecheur-spaghetti-bolognese-2025-10-1.jpg", title: "Saveurs Marines", category: "Cuisine" },
  { src: "https://img05.restaurantguru.com/reb0-spaghetti-bolognese-Le-Pecheur-2025-10-1.jpg", title: "Pasta al Mare", category: "Cuisine" },
];

export default function GalleryPage() {
  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 bg-primary-dark text-primary-light text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Galerie</h1>
          <p className="text-xl opacity-70 font-accent italic">Plongez dans l&apos;univers du Pêcheur</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="relative rounded-2xl overflow-hidden group shadow-xl cursor-zoom-in"
            >
              <Image
                src={image.src}
                alt={image.title}
                width={800}
                height={1200}
                className="w-full h-auto transition-all duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-accent-gold text-xs font-bold uppercase tracking-widest">{image.category}</span>
                <h3 className="text-white text-xl font-heading font-bold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
