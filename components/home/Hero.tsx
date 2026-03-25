"use client";

import { useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useVelocity,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function Hero() {
  useSmoothScroll();

  // ── Scroll + velocity ──────────────────────────────────────────────────────
  const { scrollY }    = useScroll();
  const velocity       = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 400, damping: 30 });

  // ── Fish arc path ──────────────────────────────────────────────────────────
  const rawFishY      = useTransform(scrollY, [0, 250, 550, 900], [0,  80, 210, 360]);
  const rawFishX      = useTransform(scrollY, [0, 250, 550, 900], [0, -45, -130, -230]);
  const rawFishRotate = useTransform(scrollY, [0, 300, 700, 900], [0,  -5,  -14,  -20]);
  const fishScale     = useTransform(scrollY, [0, 900], [1, 0.58]);
  const fishOpacity   = useTransform(scrollY, [0, 450, 720], [1, 0.75, 0]);

  // ── Velocity dynamics ─────────────────────────────────────────────────────
  // Nose tilts with scroll speed
  const velocityTilt = useTransform(smoothVelocity, [-2500, -600, 0, 600, 2500], [14, 4, 0, -4, -14]);
  // Motion blur at high speed
  const blurAmt  = useTransform(smoothVelocity, [-2500, -800, 0, 800, 2500], [5, 1.2, 0, 1.2, 5]);
  const fishFilter = useMotionTemplate`blur(${blurAmt}px)`;
  // Glow pulses when scrolling fast
  const glowStrength = useTransform(smoothVelocity, [-2000, 0, 2000], [0.9, 0.30, 0.9]);

  // ── Spring smoothing ───────────────────────────────────────────────────────
  const springFishY      = useSpring(rawFishY,      { stiffness: 55, damping: 22 });
  const springFishX      = useSpring(rawFishX,      { stiffness: 55, damping: 22 });
  const springFishRotate = useSpring(rawFishRotate, { stiffness: 55, damping: 22 });

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  const mouseX       = useMotionValue(0);
  const mouseY       = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // ── Combine all transforms into single values ──────────────────────────────
  // This avoids nesting opacity/filter that would isolate the blend mode.
  const totalY = useTransform(
    [springFishY, springMouseY],
    ([a, b]: number[]) => a + b,
  );
  const totalX = useTransform(
    [springFishX, springMouseX],
    ([a, b]: number[]) => a + b,
  );
  // Path rotation + velocity nose tilt combined
  const totalRotate = useTransform(
    [springFishRotate, velocityTilt],
    ([a, b]: number[]) => a + b,
  );

  // ── Parallax layers ────────────────────────────────────────────────────────
  const bubblesY    = useTransform(scrollY, [0, 800], [0, -180]);
  const textY       = useTransform(scrollY, [0, 400], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ── Deep ocean background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 45%, #0E4040 0%, #072222 45%, #030E0E 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3,14,14,0.72) 100%)",
          }}
        />

        {/* Caustic rays */}
        <div className="absolute inset-0 opacity-25">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bg-gradient-to-b from-accent-gold/50 via-white/5 to-transparent"
              style={{
                left:   `${8 + i * 11}%`,
                width:  `${1 + (i % 3)}px`,
                height: `${35 + i * 8}%`,
                filter: "blur(10px)",
              }}
              animate={{ x: [0, 18, -8, 0], opacity: [0.18, 0.55, 0.14, 0.18] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            />
          ))}
        </div>

        {/* Bubbles */}
        <motion.div style={{ y: bubblesY }} className="absolute inset-0 pointer-events-none">
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width:      `${3 + (i % 6) * 2.5}px`,
                height:     `${3 + (i % 6) * 2.5}px`,
                left:       `${5 + (i * 3.4) % 90}%`,
                bottom:     `${(i * 5.7) % 75}%`,
                background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 100%)",
                border:     "1px solid rgba(255,255,255,0.15)",
              }}
              animate={{
                y:       [0, -(40 + (i % 4) * 15), 0],
                opacity: [0, 0.60, 0],
                x:       [0, i % 2 === 0 ? 12 : -12, 0],
              }}
              transition={{ duration: 3.5 + (i % 5) * 0.9, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* Shimmer band */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent"
          style={{ top: "40%" }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0.4, 1, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-dark/85" />
      </div>

      {/* ── FISH GLOW AURA (sibling — outside blend-mode context) ── */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{
          y:       totalY,
          x:       totalX,
          top:     "7%",
          right:   "3%",
          width:   "clamp(260px, 50vw, 760px)",
          opacity: glowStrength,
        }}
      >
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 75% 55%, rgba(100,175,220,0.22) 0%, rgba(212,175,122,0.12) 48%, transparent 72%)",
            transform:  "scale(1.65)",
          }}
        />
      </motion.div>

      {/* ── THE FISH ──
          IMPORTANT: mix-blend-mode + opacity + filter are ALL on this ONE div.
          Having them on the same element avoids the "isolated compositing group"
          problem where a parent opacity/filter traps the blend mode.
          screen() blend makes black pixels (0,0,0) transparent: screen(0,dst)=dst.
      ── */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{
          y:            totalY,
          x:            totalX,
          rotate:       totalRotate,
          scale:        fishScale,
          opacity:      fishOpacity,
          filter:       fishFilter,
          mixBlendMode: "screen",
          top:          "7%",
          right:        "3%",
          width:        "clamp(260px, 50vw, 760px)",
        }}
      >
        {/* Idle float — on its own inner div, doesn't conflict with outer style props */}
        <motion.div
          animate={{
            y:      [0, -20, 0],
            rotate: [-1.6, 1.6, -1.6],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/fish_clean.png"
            alt="Dorade Royale — Restaurant Le Pêcheur"
            width={760}
            height={460}
            className="select-none w-full h-auto"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* ── HERO TEXT ── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-accent-gold/70" />
            <p className="text-accent-gold font-accent text-lg md:text-xl italic tracking-wide">
              Ezzahra · Ben Arous · Tunisie
            </p>
          </div>

          <h1 className="text-primary-light text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.04]">
            Restaurant
            <br />
            <span className="text-shimmer">Le Pêcheur</span>
          </h1>

          <p className="text-primary-light/65 text-lg md:text-xl font-body max-w-lg leading-relaxed">
            La marée la plus fraîche, servie au bord de la mer — jour et nuit.
            Grillades, couscous et fruits de mer 24h/24.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/reservation" className="btn-primary">
              Réserver une Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 border-2 border-primary-light/40 text-primary-light rounded-full font-heading text-lg transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:scale-105"
            >
              Voir la Carte
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* ── 24/7 badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-14 left-8 z-20"
      >
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-lg">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-primary-light font-body text-sm tracking-wide">
            Ouvert maintenant — 24h/24 &amp; 7j/7
          </span>
        </div>
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-14 right-8 z-20 hidden md:flex items-center gap-8"
      >
        {[
          { value: "25+",  label: "Ans d'expérience" },
          { value: "728+", label: "Avis clients" },
          { value: "88%",  label: "Recommandation" },
        ].map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="text-accent-gold font-heading font-bold text-2xl leading-none">{stat.value}</div>
            <div className="text-primary-light/40 font-body text-xs mt-1 tracking-wide">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary-light/35"
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* ── Wave ── */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120H1440V40C1440 40 1320 0 1200 0C1080 0 960 40 840 40C720 40 600 0 480 0C360 0 240 40 120 40C0 40 0 0 0 0V120Z"
            fill="#F7F3E8"
          />
        </svg>
      </div>
    </section>
  );
}
