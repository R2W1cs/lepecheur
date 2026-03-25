"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Phone, MapPin, Mail, MessageSquare, Facebook, Instagram, Navigation } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 bg-primary-dark text-primary-light text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Contact</h1>
          <p className="text-xl opacity-70 font-accent italic">Nous sommes à votre écoute, 24h/24</p>
        </motion.div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold font-heading">Coordonnées</h2>
              <p className="text-lg opacity-70 font-body">
                Que ce soit pour une réservation de groupe, une demande spéciale ou simplement pour nous dire bonjour, n&apos;hésitez pas à nous contacter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl space-y-4">
                <Phone className="text-accent-gold" size={32} />
                <h3 className="text-xl font-bold font-heading">Téléphone</h3>
                <p className="opacity-70">+216 71 000 000</p>
                <a href="tel:+21671000000" className="text-primary-dark font-bold hover:underline block">Appeler maintenant</a>
              </div>

              <div className="glass p-8 rounded-2xl space-y-4">
                <MessageSquare className="text-accent-gold" size={32} />
                <h3 className="text-xl font-bold font-heading">WhatsApp</h3>
                <p className="opacity-70">+216 26 000 000</p>
                <a href="https://wa.me/21626000000" className="text-primary-dark font-bold hover:underline block">Envoyer un message</a>
              </div>

              <div className="glass p-8 rounded-2xl space-y-4">
                <Mail className="text-accent-gold" size={32} />
                <h3 className="text-xl font-bold font-heading">Email</h3>
                <p className="opacity-70">contact@lepecheur.tn</p>
                <a href="mailto:contact@lepecheur.tn" className="text-primary-dark font-bold hover:underline block">Nous écrire</a>
              </div>

              <div className="glass p-8 rounded-2xl space-y-4">
                <div className="flex gap-4">
                   <Facebook className="text-accent-gold" size={32} />
                   <Instagram className="text-accent-gold" size={32} />
                </div>
                <h3 className="text-xl font-bold font-heading">Réseaux Sociaux</h3>
                <p className="opacity-70">Suivez-nous pour les arrivages du jour.</p>
                <div className="flex gap-4 font-bold">
                  <Link href="https://www.facebook.com/people/Restaurant-Le-P%C3%A9cheur/100070393052917/" className="hover:underline">Facebook</Link>
                  <Link href="#" className="hover:underline">Instagram</Link>
                </div>
              </div>
            </div>

            <div className="p-10 bg-primary-dark text-primary-light rounded-[2rem] space-y-4">
              <MapPin className="text-accent-gold" size={32} />
              <h3 className="text-2xl font-bold font-heading">Notre Adresse</h3>
              <p className="opacity-70">Rue 2 Mars 1934, Ez Zahra, Ben Arous, 2034, Tunisie</p>
              <button className="btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2">
                Démarrer la navigation <Navigation size={20} />
              </button>
            </div>
          </div>

          {/* Location & Form */}
          <div className="space-y-12">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] border border-primary-dark/10 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.0583095064506!2d10.312!3d36.745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd370000000001%3A0x0!2zUmVzdGF1cmFudCBMZSBQw6pjaGV1cg!5e0!3m2!1sfr!2stn!4v1711380000000!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale contrast-125 transition-all hover:grayscale-0"
              ></iframe>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                 <Image
                  src="https://img05.restaurantguru.com/r0b0-Le-Pecheur-design-2022-10-10.jpg"
                  alt="Restaurant Interior"
                  fill
                  className="object-cover"
                  unoptimized
                />
            </div>

            <div className="glass p-12 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold font-heading">Laissez-nous un message</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Nom" className="w-full p-4 rounded-xl bg-white border border-primary-dark/5" />
                <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-white border border-primary-dark/5" />
                <textarea rows={4} placeholder="Message" className="w-full p-4 rounded-xl bg-white border border-primary-dark/5 resize-none"></textarea>
                <button className="btn-primary w-full py-4">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
