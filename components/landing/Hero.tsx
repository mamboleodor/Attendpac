"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Threads from "@/components/Threads";
import BlurText from "@/components/BlurText";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative bg-neutral-lightBeige overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Threads
          color={[0.92, 0.34, 0.2]}
          amplitude={1.2}
          distance={0.2}
          enableMouseInteraction
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-6"
      >
        {/* Real heading for SEO/accessibility — visually hidden, BlurText below is what's seen */}
        <h1 className="sr-only">
          Attendance software that works where your team actually works
        </h1>

        <BlurText
          text="Attendance software that works where your team actually works"
          animateBy="words"
          direction="top"
          delay={80}
          className="justify-center text-[32px] md:text-[52px] font-black text-brand-darkGray leading-tight"
        />

        <motion.p
          variants={item}
          className="text-brand-darkGray max-w-2xl text-base md:text-lg -mt-2"
        >
          GPS geofencing, biometric clock-in, and offline sync for on-site and
          field staff, with live dashboards for every manager and org admin.
        </motion.p>
        <motion.div variants={item} className="flex gap-4 mt-2">
          <Link href="/login" className="btn-primary hover-bright">
            Start free →
          </Link>
          <a href="#faq" className="btn-secondary hover-dark">
            Book a demo
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}