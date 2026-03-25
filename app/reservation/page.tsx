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
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      addReservation(formData);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setIsSending(false);
    }
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

                  {errorMessage && (
                    <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100">
                      {errorMessage}
                    </p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSending}
                    className="btn-primary w-full py-5 text-xl relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span className={isSending ? "opacity-0" : "opacity-100"}>
                        Confirmer la Réservation
                    </span>
                    {isSending && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
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
                  <div className="p-3 bg-green-500/10 rounded-xl text-green-600 h-fit">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.15.614 3.735 1.684 5.322l-1.055 3.855 3.963-1.041zm11.367-7.635c-.345-.174-2.048-1.011-2.359-1.124-.312-.113-.538-.173-.764.173-.225.346-.87 1.124-1.065 1.355-.197.231-.393.26-.738.087-.345-.173-1.455-.536-2.771-1.71-1.024-.913-1.716-2.041-1.917-2.387-.202-.346-.022-.533.151-.705.155-.155.345-.404.518-.605.171-.202.23-.346.345-.577.116-.231.058-.432-.029-.605-.087-.174-.764-1.844-1.046-2.526-.276-.669-.554-.58-.764-.591-.197-.01-.424-.012-.65-.012s-.596.085-.907.433c-.312.346-1.188 1.163-1.188 2.84s1.223 3.3 1.396 3.531c.173.231 2.407 3.674 5.83 5.152.814.351 1.45.561 1.944.718.818.259 1.563.222 2.152.134.657-.098 2.048-.838 2.337-1.648.289-.811.289-1.503.202-1.648-.086-.144-.316-.231-.661-.405z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Service WhatsApp</h4>
                    <p className="text-sm opacity-70 mb-3">Besoin d'une réponse immédiate ? Échangez directement avec nous.</p>
                    <a 
                      href="https://wa.me/21656115226" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
                    >
                      Discuter sur WhatsApp
                    </a>
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
