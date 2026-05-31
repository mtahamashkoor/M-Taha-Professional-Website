/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLockScreenProps {
  onUnlock: () => void;
}

export default function AdminLockScreen({ onUnlock }: AdminLockScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Alphanumeric professional passcode
  const CORRECT_PASSCODE = 'tahainruins';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === CORRECT_PASSCODE) {
      setIsSuccess(true);
      setError(false);
      // Brief delay for nice visual transition
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError(true);
      setPasscode('');
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4" id="admin-lock-screen">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
      >
        {/* Ambient top decoration */}
        <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-amber-500/5 blur-3xl opacity-50" />

        <div className="text-center space-y-6">
          {/* Status Lock icon */}
          <div className="flex justify-center">
            {isSuccess ? (
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="h-14 w-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
              >
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              </motion.div>
            ) : (
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                error 
                  ? 'bg-rose-955 bg-rose-950/80 border border-rose-500/40 text-rose-455 text-rose-400 animate-bounce' 
                  : 'bg-zinc-950/80 border border-zinc-800 text-yellow-500'
              }`}>
                <Lock className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-sans text-xs font-extrabold text-white tracking-widest uppercase">
              Admin Access Required
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              This business portfolio lead manager is gated to prevent public visitors from editing or viewing your private lead dossiers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full text-center tracking-normal font-mono text-sm font-bold bg-zinc-950/80 border border-zinc-850 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/40 placeholder:tracking-normal placeholder:font-sans placeholder:text-zinc-650"
                id="passcode-input-field"
                required
              />
              <button
                type="button"
                id="toggle-passcode-visibility"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3.5 top-3 text-zinc-500 hover:text-white transition cursor-pointer"
              >
                {showPasscode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-[10px] text-rose-400 font-bold tracking-tight animate-pulse">
                Incorrect administrative passcode. Please retry.
              </p>
            )}

            <button
              type="submit"
              id="passcode-submit-btn"
              disabled={!passcode.trim() || isSuccess}
              className={`w-full tracking-wider uppercase font-sans text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 ${
                passcode.trim() && !isSuccess
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-zinc-950 shadow-md shadow-yellow-500/10 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <span>Unlock Console</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
