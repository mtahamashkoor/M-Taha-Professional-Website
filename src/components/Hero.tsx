/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Award, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export default function Hero({ onScrollToCalculator }: HeroProps) {
  // Stagger container animation properties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 25 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 py-16 sm:py-24 border-b border-zinc-900">
      {/* Absolute background decoration grids */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl p-1" />
      <div className="absolute right-1/4 bottom-0 -z-10 h-[300px] w-[600px] rounded-full bg-yellow-500/5 blur-3xl animate-pulse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Columns */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 w-fit"
            >
              <Award className="h-3.5 w-3.5 text-emerald-400" />
              <span>Full-Stack Web Engineering Specialist</span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Engineered Web Landscapes built on <span className="text-yellow-400 block sm:inline">Absolute Discipline.</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="font-sans text-base sm:text-lg text-zinc-350 max-w-2xl leading-relaxed"
            >
              Assalam-o-Alaikum! I am <strong className="text-white font-bold">M Taha</strong>, a software developer from Pakistan. 
              I bring absolute professional discipline, high integrity, 
              and meticulous attention to detail to every repository I write. Ready to elevate your business outreach.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="hero-planner-btn"
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3.5 text-sm font-bold text-zinc-950 transition-all hover:bg-yellow-500 shadow-xl shadow-yellow-500/10 cursor-pointer"
              >
                <span>Interactive Project Planner & Quote</span>
                <ArrowRight className="h-4 w-4 text-zinc-950" />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: '#1f1f23' }}
                whileTap={{ scale: 0.98 }}
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-850 hover:text-white"
              >
                View Services & Rates
              </motion.a>
            </motion.div>

            {/* Core Values / Business Promises */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800"
            >
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans text-xs font-bold text-zinc-100">Absolute Integrity</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Absolute transparency in project scope, timelines, & budget estimates.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-sans text-xs font-bold text-zinc-100">Responsive Scalability</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Pixel-perfect performance matching any mobile, tablet or desktop viewport.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Graphical/Interactive Stats Block */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.35 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative mx-auto max-w-sm rounded-2xl border border-zinc-800 bg-[#121215]/90 p-6 shadow-2xl shadow-black/80 glow-indigo ring-1 ring-zinc-800/50 backdrop-blur-md"
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-zinc-950 shadow"
              >
                <Sparkles className="h-3 w-3" />
              </motion.div>

              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-zinc-950 font-mono flex items-center justify-center font-bold text-sm">
                  MT
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-white">M Taha Mashkoor</h3>
                  <p className="text-[10px] text-zinc-400 font-mono">Freelance Web Architect</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-sans">Engineering Discipline</span>
                    <span className="font-mono text-white font-semibold">100% Commitment 🇵🇰</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block font-mono">Primary Focus Models</span>
                  <div className="flex flex-wrap gap-1.5 animate-[fadeIn_0.5s_ease-out_1s]">
                    <span className="inline-flex items-center rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300 font-mono">
                      TypeScript
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300 font-mono">
                      React 19 & Vite
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300 font-mono">
                      Tailwind CSS
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300 font-mono">
                      Responsive CRM
                    </span>
                    <span className="inline-flex items-center rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300 font-mono">
                      API Proxies
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 text-center">
                  <p className="text-[11px] font-sans font-medium text-zinc-400 leading-relaxed">
                    "Web development is not just about writing code; it is about building a scalable framework of trust and reach that expands your business globally."
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Ambient small floating bubble */}
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-6 w-auto bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-2xl hidden sm:flex items-center gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-zinc-300 font-bold font-mono">ACTIVE FOR CONTRACTS</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
