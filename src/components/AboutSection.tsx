/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, Cpu, UploadCloud, User } from 'lucide-react';

export default function AboutSection() {
  // Try to load user uploaded original file names in order of prevalence, falling back gracefully
  const potentialImages = [
    '/src/assets/images/taha_original.png',
    '/src/assets/images/taha_original.jpg',
    '/src/assets/images/taha_original.jpeg',
    '/src/assets/images/profile.png',
    '/src/assets/images/profile.jpg',
    '/src/assets/images/profile.jpeg',
    '/taha_original.png',
    '/profile.jpg'
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const handleImageError = () => {
    if (imageIndex < potentialImages.length - 1) {
      setImageIndex(prev => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="about">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Background ambient blur */}
        <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl opacity-60" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Profile Image Column */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-2 shadow-2xl transition duration-350 hover:border-emerald-500/30 w-full max-w-[260px]">
              <div className="relative overflow-hidden rounded-xl aspect-square flex flex-col items-center justify-center bg-zinc-900/40">
                {!hasFailedAll ? (
                  <img 
                    src={potentialImages[imageIndex]} 
                    alt="M Taha - Original Uploaded Profile" 
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-all duration-700 ease-out transform group-hover:scale-105"
                    id="about-profile-image"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 h-full">
                    <div className="h-12 w-12 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-350">Original Photo Slot</p>
                      <p className="text-[9px] text-zinc-500 leading-normal">
                        Drag your original file into <code className="text-emerald-400">src/assets/images/</code> as <code className="text-emerald-400 font-bold">taha_original.png</code> to display it directly!
                      </p>
                    </div>
                  </div>
                )}
                {/* Subtle tech overlay badge */}
                <div className="absolute top-2 right-2 bg-black/75 border border-zinc-800 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-zinc-400 uppercase tracking-widest leading-none">
                  CCK '26
                </div>
              </div>
            </div>
          </div>

          {/* Header/Title block */}
          <div className="lg:col-span-4 space-y-4">
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
          <div className="lg:col-span-5 flex flex-col gap-4">
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

