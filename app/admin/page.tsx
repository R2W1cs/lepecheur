"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Phone, Trash2, RefreshCw, LogOut, Users, Calendar,
  Clock, MessageSquare, AlertCircle, CheckCircle2, Loader2,
  ChevronRight, Search, Fish,
} from "lucide-react";

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

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fr-TN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
}

function formatReservationDate(dateStr: string) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("fr-TN", {
      weekday: "long", day: "numeric", month: "long",
    });
  } catch { return dateStr; }
}

function isToday(dateStr: string) {
  return dateStr === new Date().toISOString().split("T")[0];
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr) >= new Date(new Date().toISOString().split("T")[0]);
}

// ── Reservation Card ───────────────────────────────────────────────────────────
function ReservationCard({ r, onDelete }: { r: Reservation; onDelete: (id: string) => void }) {
  const [deleting, setDeleting] = useState(false);
  const today = isToday(r.date);
  const upcoming = !today && isUpcoming(r.date);
  const past = !today && !upcoming;

  const handleDelete = async () => {
    if (!confirm(`Supprimer la réservation de ${r.name} ?`)) return;
    setDeleting(true);
    await onDelete(r.id);
    setDeleting(false);
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg overflow-hidden ${
      today ? "border-amber-200" : upcoming ? "border-emerald-100" : "border-slate-100"
    }`}>
      {/* Status stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        today ? "bg-amber-400" : upcoming ? "bg-emerald-400" : "bg-slate-200"
      }`} />

      <div className="pl-6 pr-5 py-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left: name + badge + meta */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h3 className="text-lg font-bold text-slate-800 truncate">{r.name}</h3>
              {today && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Aujourd&apos;hui
                </span>
              )}
              {upcoming && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  À venir
                </span>
              )}
              {past && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full">
                  Passée
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Reçue le {formatDate(r.createdAt)}</p>
          </div>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200 disabled:opacity-50 shrink-0"
            title="Supprimer"
          >
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
        </div>

        {/* Details row */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={14} className="text-slate-300 shrink-0" />
            <span className="text-sm font-semibold capitalize">{formatReservationDate(r.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={14} className="text-slate-300 shrink-0" />
            <span className="text-sm font-semibold">{r.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={14} className="text-slate-300 shrink-0" />
            <span className="text-sm font-semibold">{r.guests} personne{parseInt(r.guests) > 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-300 shrink-0" />
            <a href={`tel:${r.phone}`} className="text-sm font-semibold text-blue-600 hover:underline">
              {r.phone}
            </a>
          </div>
        </div>

        {/* Note */}
        {r.note && (
          <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <MessageSquare size={13} className="text-slate-400 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600">{r.note}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <a
            href={`tel:${r.phone}`}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            <Phone size={13} />
            Appeler
          </a>
          <a
            href={`https://wa.me/${r.phone.replace(/[\s\-\+]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fb959] transition-colors"
          >
            <MessageSquare size={13} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: number; sub?: string; accent: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-1">
      <div className={`text-4xl font-black tracking-tight ${accent}`}>{value}</div>
      <div className="text-sm font-bold text-slate-700">{label}</div>
      {sub && <div className="text-xs text-slate-400">{sub}</div>}
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_key");
    if (saved) { setPassword(saved); setAuthed(true); }
  }, []);

  const fetchReservations = useCallback(async (key: string) => {
    setLoading(true);
    setDbError("");
    try {
      const res = await fetch(`/api/admin/reservations?key=${encodeURIComponent(key)}`);
      const json = await res.json();
      if (res.status === 401) { setAuthed(false); setAuthError(true); return; }
      if (json.error) setDbError(json.error);
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

  const todayCount    = reservations.filter((r) => isToday(r.date)).length;
  const upcomingCount = reservations.filter((r) => !isToday(r.date) && isUpcoming(r.date)).length;
  const totalCount    = reservations.length;

  const displayed = reservations.filter((r) => {
    const matchFilter =
      filter === "today"    ? isToday(r.date) :
      filter === "upcoming" ? isUpcoming(r.date) :
      true;
    const matchSearch = search.trim() === "" || [r.name, r.phone, r.date].some(
      (v) => v.toLowerCase().includes(search.toLowerCase())
    );
    return matchFilter && matchSearch;
  });

  // ── Login ───────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-5">
              <Fish size={28} className="text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">Le Pêcheur</h1>
            <p className="text-slate-400 mt-1 text-xs tracking-[0.3em] uppercase">Espace Privé</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} />
                Mot de passe incorrect.
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 group"
            >
              Accéder au tableau de bord
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const today = new Date().toLocaleDateString("fr-TN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Fish size={16} className="text-amber-400" />
            </div>
            <div>
              <span className="font-black text-slate-900 tracking-wider uppercase text-sm">Le Pêcheur</span>
              <span className="hidden sm:inline text-slate-300 mx-2">·</span>
              <span className="hidden sm:inline text-slate-400 text-xs capitalize">{today}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchReservations(password)}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Error banner */}
        {dbError && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-700 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            {dbError}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total" value={totalCount} sub="toutes réservations" accent="text-slate-800" />
          <StatCard label="À venir" value={upcomingCount} sub="prochaines dates" accent="text-emerald-600" />
          <StatCard label="Aujourd'hui" value={todayCount} sub={todayCount > 0 ? "tables prévues" : "aucune table"} accent="text-amber-500" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Filter pills */}
          <div className="flex gap-1.5 bg-white border border-slate-100 rounded-xl p-1 shadow-sm">
            {([
              { key: "upcoming", label: "À venir" },
              { key: "today",    label: "Aujourd'hui" },
              { key: "all",      label: "Toutes" },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filter === key
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-100 rounded-xl shadow-sm focus:outline-none focus:border-amber-300 transition-colors"
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-300">
            <Loader2 size={36} className="animate-spin mb-3" />
            <p className="text-sm">Chargement…</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-300">
            <CheckCircle2 size={48} className="mb-4 opacity-40" />
            <p className="text-base font-semibold text-slate-400">Aucune réservation</p>
            <p className="text-sm mt-1">
              {filter === "today"    ? "Pas de table pour aujourd'hui." :
               filter === "upcoming" ? "Aucune réservation à venir." :
               search               ? "Aucun résultat pour cette recherche." :
               "Aucune réservation enregistrée."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {displayed.length} réservation{displayed.length > 1 ? "s" : ""}
            </p>
            {displayed.map((r) => (
              <ReservationCard key={r.id} r={r} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
