"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const menuCategories = [
  {
    id: "entrées",
    name: "Entrées & Salades",
    items: [
      { 
        name: "Salade Méchouia", 
        description: "Poivrons et tomates grillées, ail, huile d'olive.", 
        price: "12 DT",
        image: "https://img05.restaurantguru.com/r105-Le-Pecheur-food-2025-10-2.jpg"
      },
      { 
        name: "Brik à l'œuf", 
        description: "Feuille de brik croustillante, œuf, thon, persil.", 
        price: "8 DT",
        image: "https://img05.restaurantguru.com/r5a3-meals-Le-Pecheur-2025-10.jpg"
      },
      { 
        name: "Calamars Frits", 
        description: "Anneaux de calamars frais, panure légère, citron.", 
        price: "22 DT",
        image: "https://img05.restaurantguru.com/rffb-dishes-Le-Pecheur-2025-10.jpg"
      },
      { 
        name: "Ojja Fruits de Mer", 
        description: "Sauce tomate épicée, œufs, mix de fruits de mer.", 
        price: "28 DT",
        image: "https://img05.restaurantguru.com/r8f0-food-Le-Pecheur-2025-10-2.jpg"
      },
    ]
  },
  {
    id: "poissons",
    name: "Poissons Grillés",
    items: [
      { 
        name: "Dorade Royale", 
        description: "Grillée au feu de bois, servie avec garniture du jour.", 
        price: "45 DT", 
        badge: "Frais du Jour",
        image: "https://img05.restaurantguru.com/r482-Le-Pecheur-meals-2025-10-2.jpg"
      },
      { 
        name: "Loup de Mer", 
        description: "Poisson blanc noble, chair fine et savoureuse.", 
        price: "48 DT", 
        badge: "Premium",
        image: "https://img05.restaurantguru.com/r706-Le-Pecheur-meals-2025-10.jpg"
      },
      { 
        name: "Sar (Poisson Sauvage)", 
        description: "Pêche locale, goût intense de la Méditerranée.", 
        price: "42 DT",
        image: "https://img05.restaurantguru.com/r4cc-Le-Pecheur-dishes-2022-10-9.jpg"
      },
      { 
        name: "Rouget Grillé", 
        description: "Petits poissons rouges, saveur délicate.", 
        price: "35 DT",
        image: "https://img05.restaurantguru.com/read-spaghetti-bolognese-Le-Pecheur-2025-10-2.jpg"
      },
    ]
  },
  {
    id: "specialites",
    name: "Couscous & Riz",
    items: [
      { 
        name: "Riz aux Fruits de Mer", 
        description: "Riz safrané, calamars, crevettes et moules.", 
        price: "32 DT",
        image: "https://img05.restaurantguru.com/r766-meals-Le-Pecheur-2025-10-2.jpg"
      },
      { 
        name: "Couscous au Poisson", 
        description: "Tradition tunisienne avec poisson de saison.", 
        price: "35 DT",
        image: "https://img05.restaurantguru.com/r141-paella-Le-Pecheur-2025-10.jpg"
      },
      { 
        name: "Spaghetti Fruits de Mer", 
        description: "Pâtes fraîches, sauce tomate, basilic et mer.", 
        price: "30 DT",
        image: "https://img05.restaurantguru.com/r505-Le-Pecheur-dessert-2022-10-2.jpg"
      },
      { 
        name: "Paella Royale", 
        description: "Le classique méditerranéen revisité.", 
        price: "42 DT",
        image: "https://img05.restaurantguru.com/r2fb-Le-Pecheur-paella-2025-10.jpg"
      },
    ]
  },
  {
    id: "desserts",
    name: "Desserts & Boissons",
    items: [
      { 
        name: "Fruits de Saison", 
        description: "Assortiment de fruits frais locaux.", 
        price: "15 DT",
        image: "https://img05.restaurantguru.com/r415-Le-Pecheur-dessert-2022-10-3.jpg"
      },
      { 
        name: "Baklawa Tunisienne", 
        description: "Pâtisserie fine aux amandes et miel.", 
        price: "10 DT",
        image: "https://img05.restaurantguru.com/r4cc-Le-Pecheur-dishes-2022-10-9.jpg"
      },
      { 
        name: "Thé à la Menthe", 
        description: "Thé traditionnel aux pignons.", 
        price: "5 DT",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: "Jus de Citron Frais", 
        description: "Citronnade maison pressée à la main.", 
        price: "7 DT",
        image: "https://images.unsplash.com/photo-1523362622666-4c4249a46452?auto=format&fit=crop&q=80&w=400"
      },
    ]
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("entrées");

  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-primary-dark text-primary-light text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="https://img05.restaurantguru.com/r5c7-Le-Pecheur-interior-2022-10-11.jpg"
                alt="Background"
                fill
                className="object-cover"
                unoptimized
            />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">La Carte</h1>
          <p className="text-xl opacity-70 font-accent italic">L&apos;excellence de la Méditerranée dans votre assiette</p>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] z-40 bg-primary-light/80 backdrop-blur-lg border-b border-primary-dark/10 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex justify-center px-6">
          <div className="flex gap-2 md:gap-8 py-4 min-w-max">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-heading text-lg transition-all ${
                  activeCategory === cat.id 
                    ? "bg-primary-dark text-primary-light" 
                    : "text-primary-dark/50 hover:text-primary-dark"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
          >
            {menuCategories.find(c => c.id === activeCategory)?.items.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-primary-dark/5 group overflow-hidden"
              >
                <div className="w-full sm:w-32 h-32 relative flex-shrink-0 overflow-hidden rounded-2xl">
                    <Image 
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                    />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-2xl font-heading font-bold group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h3>
                      <div className="text-xl font-heading font-bold text-accent-gold whitespace-nowrap">
                        {item.price}
                      </div>
                    </div>
                    {item.badge && (
                      <span className="inline-block text-[10px] bg-accent-gold text-primary-dark px-2 py-0.5 rounded-full font-bold uppercase mb-2">
                        {item.badge}
                      </span>
                    )}
                    <p className="text-primary-dark/60 font-body text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Daily Catch Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-primary-dark text-primary-light p-12 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <Image 
                src="https://img05.restaurantguru.com/r706-Le-Pecheur-meals-2025-10.jpg"
                alt="Artistic background"
                fill
                className="object-cover"
                unoptimized
              />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic font-accent text-accent-gold leading-tight">Envie de quelque chose de particulier ?</h2>
            <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
              Chaque jour, notre chef sélectionne les plus belles pièces arrivées du port d&apos;Ezzahra. Appelez-nous pour découvrir nos plats du jour exclusifs.
            </p>
            <a href="tel:+21671000000" className="btn-primary inline-flex items-center gap-2 px-10 py-5 text-xl">
              Explorer les arrivages
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
