"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Calendar, Users, Clock, MessageSquare, CheckCircle } from "lucide-react";
import { useReservationStore } from "@/store/useReservationStore";

export default function ReservationPage() {
  const addReservation = useReservationStore((state) => state.addReservation);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation(formData);
    setIsSubmitted(true);
    // Reset after some time
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Side */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">Réserver une Table</h1>
                <p className="text-lg text-primary-dark/70 font-body">
                  Planifiez votre moment d&apos;exception au bord de l&apos;eau. Nous vous confirmerons votre réservation par téléphone.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider block">Nom Complet</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Mohamed Ali"
                        className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider block">Téléphone</label>
                      <input
                        required
                        type="tel"
                        placeholder="+216 -- --- ---"
                        className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider block">Date</label>
                      <div className="relative">
                        <input
                          required
                          type="date"
                          className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider block">Heure</label>
                      <input
                        required
                        type="time"
                        className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider block">Personnes</label>
                      <select
                        className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all appearance-none"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((n) => (
                          <option key={n} value={n}>{n} Personnes</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider block">Demandes Spéciales (Optionnel)</label>
                    <textarea
                      rows={4}
                      placeholder="Ex: Table près de la fenêtre, anniversaire..."
                      className="w-full bg-white border border-primary-dark/10 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all resize-none"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full py-5 text-xl">
                    Confirmer la Réservation
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-12 rounded-3xl text-center space-y-6"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-green-500 text-white rounded-full">
                    <CheckCircle size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-green-800">C&apos;est Noté !</h2>
                  <p className="text-green-700 text-lg">
                    Votre demande de réservation a été enregistrée. Notre équipe vous appellera sous peu au <span className="font-bold underline">{formData.phone}</span> pour confirmer.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="text-green-800 font-bold hover:underline">
                    Faire une autre réservation
                  </button>
                </motion.div>
              )}
            </div>

            {/* Practical Info Side */}
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="glass p-10 rounded-3xl space-y-8 border-accent-gold/20">
                <h3 className="text-2xl font-heading font-bold mb-4">Informations Pratiques</h3>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-gold/10 rounded-xl text-accent-gold h-fit">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Ouvert 24h/24</h4>
                    <p className="text-sm opacity-70">Nous acceptons les réservations à toute heure du jour ou de la nuit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-gold/10 rounded-xl text-accent-gold h-fit">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Confirmation par téléphone</h4>
                    <p className="text-sm opacity-70">Toute réservation doit être validée par notre équipe pour être effective.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-primary-dark/10">
                  <p className="text-sm italic opacity-60">
                    &quot;Pour les groupes de plus de 10 personnes, veuillez nous contacter directement par téléphone pour un menu personnalisé.&quot;
                  </p>
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                 <Image
                  src="https://img.restaurantguru.com/rbc8-dining-table-Le-pecheur.jpg"
                  alt="Restaurant Dining"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
