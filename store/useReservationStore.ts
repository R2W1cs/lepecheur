"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReservationState {
  reservations: any[];
  addReservation: (reservation: any) => void;
  removeReservation: (id: string) => void;
}

export const useReservationStore = create<ReservationState>()(
  persist(
    (set) => ({
      reservations: [],
      addReservation: (reservation) =>
        set((state) => ({
          reservations: [...state.reservations, { ...reservation, id: Date.now().toString() }],
        })),
      removeReservation: (id) =>
        set((state) => ({
          reservations: state.reservations.filter((r) => r.id !== id),
        })),
    }),
    {
      name: "le-pecheur-reservations",
    }
  )
);
