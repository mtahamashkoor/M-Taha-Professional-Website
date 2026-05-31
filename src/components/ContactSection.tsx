/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Globe, ArrowUpRight, MessageSquare, ShieldAlert } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function ContactSection() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-16" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand/Inquiries prompt column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-white shadow">
              <span className="font-mono text-base font-bold">MT</span>
            </div>
            
            <h3 className="font-sans text-xl font-bold tracking-tight text-white">
              Let's Build Your Web Legacy Together.
            </h3>
            
            <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-sm">
              Whether you are an established business owner in Pakistan or a growing startup in Europe or the Middle East, I offer disciplined development delivery models built to last. Let's schedule an initial review call today.
            </p>

            <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-4 text-[11px] text-zinc-400 flex gap-2.5 items-start">
              <ShieldAlert className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                As a standard professional policy, all codebase specs are backed by responsive staging links prior to domain handoff.
              </p>
            </div>
          </div>

          {"/* Contact Direct Portals Columns */"}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Contact Card 1: Direct Inquiries */}
            <div className="bg-zinc-905 bg-zinc-900/45 border border-zinc-800 p-5 rounded-2xl shadow-xl space-y-4">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Primary Channels</span>
              <h4 className="font-sans text-sm font-bold text-white">Direct Inquiries</h4>
              
              <ul className="space-y-3.5 text-xs font-sans text-zinc-400">
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-emerald-450" />
                  <a href="mailto:mtahamashkoor57@gmail.com" className="hover:text-emerald-400 hover:underline transition">
                    mtahamashkoor57@gmail.com
                  </a>
                </li>
                
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-emerald-455 text-emerald-400" />
                  <a href="tel:+923169668028" className="hover:text-emerald-400 hover:underline transition">
                    +92 3169668028
                  </a>
                </li>

                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-zinc-600" />
                  <span className="text-zinc-400">Peshawar / Kohat, Pakistan 🇵🇰</span>
                </li>
              </ul>
            </div>

            {/* Contact Card 2: Strategic Networks */}
            <div className="bg-zinc-901 bg-zinc-900/45 border border-zinc-800 p-5 rounded-2xl shadow-xl space-y-4">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Strategic Outreach</span>
              <h4 className="font-sans text-sm font-bold text-white">Digital Footprints</h4>

              <div className="space-y-3.5 text-xs font-sans">
                <a
                  href="https://wa.me/923169668028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-400 hover:text-emerald-400 group transition"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-emerald-500" />
                    <span>Instant WhatsApp Chat</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition text-emerald-400" />
                </a>

                <div className="flex items-center justify-between text-zinc-500 border-t border-zinc-850 border-zinc-800 pt-3">
                  <span className="flex items-center gap-2 text-zinc-455 text-zinc-400">
                    <Globe className="h-4 w-4" />
                    <span>Upwork & Github Space</span>
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">Linked Portals</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Brand Details Row */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <p className="text-[11px] text-zinc-500 font-sans">
            &copy; {new Date().getFullYear()} M Taha Web Solutions. All absolute copyrights reserved globally.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
