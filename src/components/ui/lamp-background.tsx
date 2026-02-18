"use client";
import React from "react";
import { motion } from "framer-motion";

export function LampBackground({
  brandText = "GatePass",
}: {
  brandText?: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40 md:opacity-60"
    >
      <div className="relative h-full w-full isolate bg-slate-950">
        <motion.div
          initial={{ opacity: 0.5, width: "18rem" }}
          whileInView={{ opacity: 0.95, width: "36rem" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute right-1/2 top-0 h-56 w-[36rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "18rem" }}
          whileInView={{ opacity: 0.95, width: "36rem" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute left-1/2 top-0 h-56 w-[36rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" />
        <div className="absolute top-1/2 z-10 h-48 w-full bg-transparent opacity-10 backdrop-blur-sm" />
        <div className="absolute inset-auto z-10 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl left-1/2 -translate-x-1/2" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "20rem" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-10 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400/70 blur-2xl left-1/2 -translate-x-1/2"
        />
        <motion.div
          initial={{ width: "18rem" }}
          whileInView={{ width: "34rem" }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-10 h-0.5 w-[34rem] -translate-y-[7rem] bg-cyan-400 left-1/2 -translate-x-1/2"
        />
        <motion.h1
          initial={{ opacity: 0.0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-500/50 drop-shadow-[0_10px_25px_rgba(34,211,238,0.35)]"
        >
          {brandText}
        </motion.h1>
      </div>
    </div>
  );
}
