"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ahmed Ben Ali",
    text: "Le meilleur poisson de toute la banlieue sud. La dorade grillée est un incontournable. Service impeccable même à 3h du matin !",
    stars: 5,
    source: "Facebook",
  },
  {
    name: "Sonia M.",
    text: "Une vue magnifique et une cuisine authentique. Le couscous au poisson me rappelle celui de ma grand-mère. Je recommande vivement.",
    stars: 5,
    source: "Google Reviews",
  },
  {
    name: "Haithem K.",
    text: "C'est l'endroit parfait pour un dîner tardif après une longue journée. Fraîcheur garantie et équipe très accueillante.",
    stars: 4,
    source: "Facebook",
  },
  {
    name: "Marwen J.",
    text: "L'ambiance est superbe, surtout sur la terrasse. Les prix sont corrects pour la qualité proposée. Bravo à toute l'équipe.",
    stars: 5,
    source: "Foursquare",
  },
  {
    name: "Ines B.",
    text: "Leurs entrées sont variées et délicieuses. Le brik est croustillant à souhait. Une adresse sûre à Ezzahra.",
    stars: 5,
    source: "Facebook",
  },
  {
    name: "Karim A.",
    text: "Incroyable fraîcheur, service chaleureux. Le loup de mer grillé était parfaitement cuit. On reviendra sans hésiter.",
    stars: 5,
    source: "Google Reviews",
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] mx-4 bg-white rounded-3xl p-8 shadow-sm border border-primary-dark/5 relative group hover:shadow-deep transition-all duration-500">
      <Quote className="absolute top-6 right-7 text-accent-gold/15 group-hover:text-accent-gold/30 transition-colors" size={52} />
      <div className="flex gap-1 mb-4 text-accent-gold">
        {Array.from({ length: review.stars }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="text-primary-dark/75 font-body text-[0.95rem] leading-relaxed italic mb-6">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex justify-between items-center pt-4 border-t border-primary-dark/5">
        <span className="font-heading font-bold text-base">{review.name}</span>
        <span className="text-[10px] bg-primary-dark/5 px-3 py-1 rounded-full text-primary-dark/50 uppercase font-bold tracking-widest">
          {review.source}
        </span>
      </div>
    </div>
  );
}

const row1 = [...reviews, ...reviews];
const row2 = [...[...reviews].reverse(), ...[...reviews].reverse()];

export default function Testimonials() {
  return (
    <section className="py-28 overflow-hidden bg-primary-light">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[1px] w-10 bg-accent-gold/50" />
          <h3 className="text-accent-gold font-accent text-2xl italic">Témoignages</h3>
          <div className="h-[1px] w-10 bg-accent-gold/50" />
        </div>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Ce Que Disent<br />
          <span className="text-shimmer">Nos Clients</span>
        </h2>
        <div className="flex items-center justify-center gap-3 text-accent-gold pt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
          </div>
          <span className="font-bold text-base">88% de Recommandation</span>
          <span className="text-primary-dark/40 text-sm">&mdash; 728+ avis</span>
        </div>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-6">
        <div className="animate-marquee">
          {row1.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="animate-marquee-reverse">
          {row2.map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
