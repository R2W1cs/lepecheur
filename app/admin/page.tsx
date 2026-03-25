"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone, Trash2, RefreshCw, LogOut, Users, Calendar, Clock, MessageSquare, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note?: string;
  createdAt: string;
  status: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-TN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
}

function isToday(dateStr: string) {
  const today = new Date().toISOString().split("T")[0];
  return dateStr === today;
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr) >= new Date(new Date().toISOString().split("T")[0]);
}

// ── Card ──────────────────────────────────────────────────────────────────────
function ReservationCard({
  r,
  onDelete,
}: {
  r: Reservation;
  onDelete: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const today = isToday(r.date);
  const upcoming = isUpcoming(r.date);

  const handleDelete = async () => {
    if (!confirm(`Supprimer la réservation de ${r.name} ?`)) return;
    setDeleting(true);
    await onDelete(r.id);
    setDeleting(false);
  };

  return (
    <div
      className={`bg-white rounded-2xl border-l-4 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
        today
          ? "border-l-amber-400"
          : upcoming
          ? "border-l-emerald-400"
          : "border-l-slate-200"
      }`}
    >
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-800">{r.name}</h3>
              {today && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                  Aujourd&apos;hui
                </span>
              )}
              {!today && upcoming && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                  À venir
                </span>
              )}
              {!upcoming && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full">
                  Passée
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs mt-1">Reçue le {formatDate(r.createdAt)}</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200 disabled:opacity-50"
            title="Supprimer"
          >
            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={15} className="text-slate-400 shrink-0" />
            <span className="text-sm font-semibold">{r.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={15} className="text-slate-400 shrink-0" />
            <span className="text-sm font-semibold">{r.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={15} className="text-slate-400 shrink-0" />
            <span className="text-sm font-semibold">{r.guests} pers.</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={15} className="text-slate-400 shrink-0" />
            <a
              href={`tel:${r.phone}`}
              className="text-sm font-semibold text-emerald-600 hover:underline"
            >
              {r.phone}
            </a>
          </div>
        </div>

        {r.note && (
          <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-slate-700 flex gap-2">
            <MessageSquare size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>{r.note}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`tel:${r.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors"
          >
            <Phone size={15} />
            Appeler
          </a>
          <a
            href={`https://wa.me/${r.phone.replace(/[\s\-\+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#1ebe5d] transition-colors"
          >
            <MessageSquare size={15} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "today">("upcoming");

  const savedKey = typeof window !== "undefined" ? sessionStorage.getItem("admin_key") : null;

  useEffect(() => {
    if (savedKey) {
      setPassword(savedKey);
      setAuthed(true);
    }
  }, []);

  const fetchReservations = useCallback(async (key: string) => {
    setLoading(true);
    setDbError("");
    try {
      const res = await fetch(`/api/admin/reservations?key=${encodeURIComponent(key)}`);
      const json = await res.json();
      if (res.status === 401) { setAuthed(false); setAuthError(true); return; }
      if (json.error && json.reservations?.length === 0) setDbError(json.error);
      setReservations(json.reservations || []);
    } catch {
      setDbError("Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && password) fetchReservations(password);
  }, [authed, password, fetchReservations]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    sessionStorage.setItem("admin_key", password);
    setAuthed(true);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, key: password }),
    });
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_key");
    setAuthed(false);
    setPassword("");
    setReservations([]);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const todayCount    = reservations.filter((r) => isToday(r.date)).length;
  const upcomingCount = reservations.filter((r) => isUpcoming(r.date)).length;
  const totalCount    = reservations.length;

  const displayed = reservations.filter((r) => {
    if (filter === "today")    return isToday(r.date);
    if (filter === "upcoming") return isUpcoming(r.date);
    return true;
  });

  // ── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white tracking-widest uppercase">Le Pêcheur</h1>
            <p className="text-slate-400 mt-2 text-sm tracking-widest uppercase">Tableau de Bord — Accès Privé</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-2xl space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
            </div>
            {authError && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                <AlertCircle size={16} />
                Mot de passe incorrect.
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-amber-500 transition-all duration-300"
            >
              Accéder au tableau de bord
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Topbar */}
      <header className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-bold tracking-widest uppercase">Le Pêcheur</h1>
          <p className="text-slate-400 text-xs mt-0.5 tracking-widest uppercase">Tableau de Bord — Réservations</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchReservations(password)}
            disabled={loading}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Chargement..." : "Actualiser"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* DB error banner */}
        {dbError && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-amber-800 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Erreur de chargement</p>
              <p className="opacity-70 mt-1">{dbError}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: totalCount, icon: CheckCircle2, color: "text-slate-600 bg-white" },
            { label: "À venir", value: upcomingCount, icon: Calendar, color: "text-emerald-700 bg-emerald-50" },
            { label: "Aujourd'hui", value: todayCount, icon: Clock, color: "text-amber-700 bg-amber-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5 shadow-sm flex items-center gap-4`}>
              <s.icon size={28} className="opacity-60" />
              <div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["upcoming", "today", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                filter === f
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f === "upcoming" ? "À venir" : f === "today" ? "Aujourd'hui" : "Toutes"}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-24 text-slate-400">
            <Loader2 size={36} className="animate-spin" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <CheckCircle2 size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">Aucune réservation</p>
            <p className="text-sm mt-1">
              {filter === "today" ? "Pas de réservation pour aujourd'hui." :
               filter === "upcoming" ? "Aucune réservation à venir." : "Aucune réservation enregistrée."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayed.map((r) => (
              <ReservationCard key={r.id} r={r} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
