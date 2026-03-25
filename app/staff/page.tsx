import redis from '@/lib/redis';
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Users, Phone, Calendar, Clock, MessageSquare, Trash2, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note: string;
  createdAt: string;
}

export default async function StaffDashboard({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const isAuthorized = searchParams.key === "lepecheur2024";

  if (!isAuthorized) {
    return (
      <main className="bg-primary-dark min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center space-y-6 max-w-md">
           <div className="w-20 h-20 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto text-accent-gold">
             <ShieldCheck size={40} />
           </div>
           <h1 className="text-3xl font-heading text-white font-bold">Accès Restreint</h1>
           <p className="text-white/60">Ce tableau de bord est réservé au personnel du restaurant Le Pêcheur.</p>
           <div className="pt-4">
             <a href="/" className="text-accent-gold hover:underline">Retour à l'accueil</a>
           </div>
        </div>
      </main>
    );
  }

  // Fetch reservations from Redis with fallback to prevent 500
  let reservations: Reservation[] = [];
  let dbStatus: 'connected' | 'error' | 'loading' = 'loading';
  
  try {
    const rawReservations = await redis.lrange('reservations', 0, 50);
    reservations = rawReservations.map((r: any) => 
      typeof r === 'string' ? JSON.parse(r) : r
    );
    dbStatus = 'connected';
  } catch (err) {
    console.error("Dashboard fetch error (Redis connection failed):", err);
    dbStatus = 'error';
  }

  return (
    <main className="bg-primary-light min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-bold text-primary-dark">Tableau de Bord</h1>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border ${
                  dbStatus === 'connected' 
                    ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  {dbStatus === 'connected' ? 'Base de données connectée' : 'Erreur de connexion'}
                </div>
              </div>
              <p className="text-primary-dark/60 font-body text-lg">
                Gestion des réservations en temps réel • {reservations.length} dernières entrées
              </p>
            </div>

          <div className="grid grid-cols-1 gap-6">
            {reservations.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-primary-dark/10 shadow-inner">
                <div className="w-16 h-16 bg-primary-dark/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-dark/20">
                   <Calendar size={32} />
                </div>
                <p className="text-xl text-primary-dark/60 font-heading mb-4">Aucune réservation pour le moment.</p>
                <div className="max-w-md mx-auto p-6 bg-accent-gold/5 rounded-2xl border border-accent-gold/20 text-sm text-primary-dark/80 space-y-3">
                   <p className="font-bold">💡 Note pour l'administrateur :</p>
                   <p>Si vous avez fait des tests et que cette liste reste vide, assurez-vous d'avoir connecté le **Vercel KV (Redis)** dans votre tableau de bord Vercel.</p>
                   <div className="flex justify-center gap-2 pt-2">
                      <span className="px-2 py-1 bg-white border border-primary-dark/10 rounded">Vercel</span>
                      <span className="px-2 py-1 bg-white border border-primary-dark/10 rounded">Storage</span>
                      <span className="px-2 py-1 bg-white border border-primary-dark/10 rounded">Connect</span>
                   </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden bg-white rounded-3xl shadow-sm border border-primary-dark/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary-dark text-white uppercase text-xs tracking-widest">
                      <th className="p-6 font-bold">Client</th>
                      <th className="p-6 font-bold">Détails</th>
                      <th className="p-6 font-bold">Note</th>
                      <th className="p-6 font-bold text-right">Reçu le</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-dark/5">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-primary-light/30 transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-lg text-primary-dark">{res.name}</div>
                          <div className="flex items-center gap-2 text-primary-dark/60 mt-1">
                            <Phone size={14} className="text-accent-gold" />
                            <a href={`tel:${res.phone}`} className="hover:text-accent-gold transition-colors underline-offset-4 hover:underline">
                                {res.phone}
                            </a>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Calendar size={16} className="text-accent-gold" />
                              <span className="font-medium">{res.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock size={16} className="text-accent-gold" />
                              <span className="font-medium">{res.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Users size={16} className="text-accent-gold" />
                              <span className="font-medium">{res.guests} pers.</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 max-w-xs">
                          {res.note ? (
                            <div className="flex gap-2 text-sm text-primary-dark/70 bg-primary-light/50 p-3 rounded-xl italic">
                              <MessageSquare size={14} className="shrink-0 mt-0.5 text-accent-gold" />
                              {res.note}
                            </div>
                          ) : (
                            <span className="text-primary-dark/20 text-sm">Pas de note</span>
                          )}
                        </td>
                        <td className="p-6 text-right">
                          <div className="text-sm text-primary-dark/40">
                             {format(new Date(res.createdAt), "d MMM, HH:mm", { locale: fr })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
