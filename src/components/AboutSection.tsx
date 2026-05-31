/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Cpu } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="about">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Background ambient blur */}
        <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl opacity-60" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Header/Title block */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Digital Architect Bio
            </span>
            <h3 className="font-sans text-3xl font-extrabold tracking-tight text-white leading-tight">
              About M Taha
            </h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Applying structured architectural systems and rigorous coding standards to build custom business software. My development process is modeled after absolute transparency, high-density component styling, and fast responsive delivery.
            </p>
          </div>

          {/* Education & Values Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education Box */}
            <div className="bg-zinc-950/60 border border-zinc-850 p-5 rounded-2xl space-y-3 hover:border-zinc-700 transition duration-300">
              <div className="h-9 w-9 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Academic Roots</span>
                <h4 className="font-sans text-sm font-bold text-white mt-1">Cadet College Kohat Graduate</h4>
                <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  As a CCK Graduate (Class of 2026 Alumnus), the legacy of academic rigor, disciplined focus, and structural integrity underpins every single line of code and engineering milestone.
                </p>
              </div>
            </div>

            {/* Core Competency Box */}
            <div className="bg-zinc-950/60 border border-zinc-850 p-5 rounded-2xl space-y-3 hover:border-zinc-700 transition duration-300">
              <div className="h-9 w-9 rounded-lg bg-yellow-950/50 border border-yellow-800/60 flex items-center justify-center text-yellow-500">
                <Cpu className="h-5 w-5 animate-[pulse_3s_infinite]" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Core Competency</span>
                <h4 className="font-sans text-sm font-bold text-white mt-1">Full-Stack Solutions</h4>
                <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Specializing in React, Node.js server architectures, custom API integrations, real-time dashboards, and secure backend operations with premium client experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

