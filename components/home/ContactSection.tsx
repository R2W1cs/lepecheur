"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageSquare, Navigation } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 px-6 bg-primary-light">
      <div className="max-w-7xl mx-auto bg-primary-dark rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Info Side */}
          <div className="p-12 md:p-20 space-y-12 text-primary-light">
            <div className="space-y-4">
              <h3 className="text-accent-gold font-accent text-2xl italic">Nous Rendre Visite</h3>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Où Nous Trouver ?</h2>
              <p className="opacity-70 max-w-md font-body">
                Situé sur la corniche d&apos;Ezzahra, nous vous accueillons dans un cadre idyllique face à la mer, 24 heures sur 24.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl mb-1">Adresse</h4>
                  <p className="opacity-70">Rue 2 Mars 1934, Ez Zahra, Ben Arous, Tunisie</p>
                  <button className="text-accent-gold text-sm font-bold flex items-center gap-1 mt-2 hover:underline">
                    Démarrer la navigation <Navigation size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl mb-1">Téléphone</h4>
                  <a href="tel:+21671000000" className="opacity-70 hover:text-white transition-colors">+216 71 000 000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-accent-gold">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl mb-1">WhatsApp</h4>
                  <a href="https://wa.me/21626000000" className="opacity-70 hover:text-white transition-colors">+216 26 000 000</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="relative min-h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.0583095064506!2d10.312!3d36.745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd370000000001%3A0x0!2zUmVzdGF1cmFudCBMZSBQw6pjaGV1cg!5e0!3m2!1sfr!2stn!4v1711380000000!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-70"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
