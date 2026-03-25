"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Clock, Award, Waves, Fish, Users } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const stats = [
  { value: "25+",  label: "Années d'expérience" },
  { value: "300+", label: "Plats au menu"       },
  { value: "88%",  label: "Clients satisfaits"  },
  { value: "24/7", label: "Ouvert non-stop"      },
];

const features = [
  {
    icon: Clock,
    title: "Service 24h/24",
    desc: "Toujours prêts à vous accueillir, jour et nuit.",
  },
  {
    icon: Award,
    title: "Qualité Reconnue",
    desc: "88% de recommandation par nos clients.",
  },
  {
    icon: Fish,
    title: "Pêche Locale",
    desc: "Poissons sélectionnés chaque matin au port.",
  },
  {
    icon: Users,
    title: "Cuisine Familiale",
    desc: "Une tradition transmise de génération en génération.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY    = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-primary-light text-primary-dark overflow-hidden relative">
      {/* Decorative watermark */}
      <div className="absolute top-0 right-0 opacity-[0.025] rotate-12 pointer-events-none translate-x-1/4 translate-y-1/4">
        <Waves size={640} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-accent-gold/50" />
                <span className="text-accent-gold font-accent text-2xl italic">Notre Histoire</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08]">
                L&apos;Excellence Marine<br />
                <span className="text-shimmer">À Ezzahra.</span>
              </h2>
            </div>

            <p className="text-lg text-primary-dark/65 font-body leading-relaxed max-w-xl border-l-[3px] border-accent-gold/25 pl-8">
              Situé au cœur de la côte de Ben Arous, Restaurant Le Pêcheur est devenu une institution pour les amateurs de gastronomie marine. Notre engagement : servir le poisson le plus frais, pêché localement, dans une ambiance chaleureuse et raffinée.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group flex gap-5">
                  <div className="flex-shrink-0 p-4 bg-white shadow-sm rounded-2xl text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all duration-300 h-fit">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg mb-1">{title}</h4>
                    <p className="text-sm text-primary-dark/55 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/reservation" className="btn-primary inline-block">
              Réserver une Table
            </Link>
          </motion.div>

          {/* Image */}
          <div className="relative">
            <motion.div
              style={{ scale: imageScale }}
              className="relative rounded-[3rem] overflow-hidden shadow-deep bg-primary-dark/5"
            >
              <div className="absolute inset-0 bg-primary-dark/10 z-10 mix-blend-overlay" />
              <motion.div style={{ y: imageY }} className="relative h-full w-full">
                <Image
                  src="https://img05.restaurantguru.com/r5c7-Le-Pecheur-interior-2022-10-11.jpg"
                  alt="Restaurant Interior"
                  width={800}
                  height={1000}
                  className="object-cover h-full w-full"
                  unoptimized
                />
              </motion.div>
            </motion.div>

            {/* Floating glass card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-10 -left-10 glass p-9 rounded-[2.5rem] hidden md:block max-w-[300px] shadow-2xl border border-white/50 ring-1 ring-black/5"
            >
              <div className="space-y-3">
                <div className="text-accent-gold font-accent text-2xl italic leading-none">&quot;Frais du Jour&quot;</div>
                <p className="text-sm opacity-75 leading-relaxed font-body">
                  Nos poissons sont sélectionnés chaque matin pour garantir une fraîcheur absolue.
                </p>
                <div className="w-12 h-[2px] bg-accent-gold/35" />
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-35">Authenticité & Tradition</p>
              </div>
            </motion.div>

            {/* Year badge */}
            <div className="absolute top-8 -right-8 hidden xl:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-accent-gold text-primary-light shadow-gold-glow rotate-12">
              <span className="text-[9px] uppercase tracking-tight opacity-80">Fondé en</span>
              <span className="text-2xl font-bold font-heading">1998</span>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary-dark/8 rounded-3xl overflow-hidden shadow-sm"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-light px-8 py-10 text-center group hover:bg-accent-gold/5 transition-colors duration-300"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-accent-gold mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-primary-dark/45 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
