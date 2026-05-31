/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon, Layout, FileSpreadsheet, Lock, Sparkles, CheckCircle2, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  activeTab: 'client' | 'admin';
  onChangeTab: (tab: 'client' | 'admin') => void;
  unreadInquiriesCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navigation({ 
  activeTab, 
  onChangeTab, 
  unreadInquiriesCount,
  theme,
  onToggleTheme
}: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      {/* Professional Principles Banner */}
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-center text-xs text-white sm:px-6">
        <div className="flex items-center gap-2 mx-auto justify-center">
          <span className="inline-flex items-center justify-center rounded-sm bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
            STUDIO VALUES
          </span>
          <span className="font-sans font-medium text-zinc-350">
            Built on discipline, absolute integrity, and precision web engineering standards.
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white border border-zinc-800 shadow-md">
            <span className="font-mono text-lg font-bold tracking-wider text-emerald-400">MT</span>
          </div>
          <div>
            <h1 className="font-sans text-base font-bold tracking-tight text-white">
              M TAHA <span className="font-mono text-xs font-semibold text-zinc-400">Web Solutions</span>
            </h1>
            <p className="text-[10px] font-medium text-zinc-400">Professional Digital Architect Studio</p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          {/* Theme Toggler button */}
          <button
            onClick={onToggleTheme}
            id="theme-toggler"
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-500 animate-[spin_8s_linear_infinite]" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-500" />
            )}
          </button>

          <button
            id="nav-client-tab"
            onClick={() => onChangeTab('client')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
              activeTab === 'client'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Layout className="h-4 w-4 text-white" />
            <span>Interactive Portfolio</span>
          </button>

          <button
            id="nav-admin-tab"
            onClick={() => onChangeTab('admin')}
            className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 ${
              activeTab === 'admin'
                ? 'bg-zinc-805 bg-zinc-800 border border-zinc-700 text-yellow-400 shadow-sm'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Lock className={`h-3.5 w-3.5 ${activeTab === 'admin' ? 'text-yellow-400' : 'text-zinc-400'}`} />
            <span>Business Admin</span>
            
            {unreadInquiriesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-zinc-950 animate-pulse">
                {unreadInquiriesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
