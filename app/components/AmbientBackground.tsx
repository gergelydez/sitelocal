"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function AmbientBackground() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 2000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 500]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 200]);
  const y4 = useTransform(scrollY, [0, 2000], [0, 400]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute w-[520px] h-[520px] rounded-full blur-[90px] opacity-55 -top-36 -left-28"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#3730A3,transparent_70%)]" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute w-[460px] h-[460px] rounded-full blur-[90px] opacity-35 top-[280px] -right-40"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#2563EB,transparent_70%)]" />
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="absolute w-[420px] h-[420px] rounded-full blur-[90px] opacity-25 top-[900px] left-[20%]"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#0D9488,transparent_70%)]" />
      </motion.div>
      <motion.div
        style={{ y: y4 }}
        className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-30 top-[1500px] -right-24"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#3730A3,transparent_70%)]" />
      </motion.div>
    </div>
  );
}
