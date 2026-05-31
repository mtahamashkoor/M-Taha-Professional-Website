/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ConceptWork() {
  // ConfigState for Interactive UI Customizer Showcase
  const [activeTab, setActiveTab] = useState<'ui_builder' | 'cart_sim'>('ui_builder');
  
  // Customizer state
  const [cardRadius, setCardRadius] = useState<'none' | 'md' | 'xl' | 'full'>('xl');
  const [cardShadow, setCardShadow] = useState<'none' | 'sm' | 'lg' | 'xl'>('lg');
  const [accentColor, setAccentColor] = useState<'indigo' | 'emerald' | 'amber' | 'neutral'>('emerald');
  const [layoutDensity, setLayoutDensity] = useState<'relaxed' | 'snug'>('relaxed');

  // E-commerce simulation state
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const [cartItems] = useState([
    { id: 1, name: 'Premium Cloud Consultation', price: 95 },
    { id: 2, name: 'Standard Tailwind System Setup', price: 140 }
  ]);

  // Handle promo code logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'TAHADEV') {
      setDiscountPercent(15);
      setCouponFeedback('Assalam-o-Alaikum! Special 15% studio launch discount applied.');
    } else if (cleanCode === 'PARTNER') {
      setDiscountPercent(10);
      setCouponFeedback('Special Partner Promo Code! 10% discount applied.');
    } else {
      setDiscountPercent(0);
      setCouponFeedback('Coupon not active. Try coupon code: TAHADEV');
    }
  };

  const cartTotalRaw = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const discountUSD = Math.round((cartTotalRaw * discountPercent) / 100);
  const finalCartTotal = cartTotalRaw - discountUSD;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6 md:p-8 shadow-2xl space-y-8" id="showcase">
      
      {/* Block title */}
      <div className="border-b border-zinc-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white">
            Interactive Frontend Prototypes
          </h3>
          <p className="font-sans text-sm text-zinc-400 mt-0.5">
            Interact with live React component simulations designed directly by Taha to test his development precision.
          </p>
        </div>

        {/* Simulator Switcher */}
        <div className="flex bg-zinc-950 p-1 rounded-lg self-center sm:self-auto text-xs border border-zinc-800 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('ui_builder')}
            className={`px-3 py-1.5 rounded-md font-sans font-bold transition-all relative ${
              activeTab === 'ui_builder'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Live UI Stylist
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('cart_sim')}
            className={`px-3 py-1.5 rounded-md font-sans font-bold transition-all relative ${
              activeTab === 'cart_sim'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Checkout Engine
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {activeTab === 'ui_builder' ? (
            /* SIMULATOR 1: Live UI Stylist */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Controls column */}
              <div className="md:col-span-5 bg-zinc-950/80 rounded-xl p-5 border border-zinc-800 space-y-5">
                <h4 className="font-sans text-xs font-extrabold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Settings className="h-4 w-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Tailwind Component Stylist</span>
                </h4>

                {/* Radius modifier */}
                <div className="space-y-2 text-xs font-sans">
                  <span className="font-sans font-semibold text-zinc-400">Border Radius (Rounded Class)</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['none', 'md', 'xl', 'full'] as const).map((r) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={r}
                        onClick={() => setCardRadius(r)}
                        className={`py-1 rounded text-[10px] font-semibold border transition cursor-pointer ${
                          cardRadius === r
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        {r.toUpperCase()}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Shadow modifier */}
                <div className="space-y-2 text-xs font-sans">
                  <span className="font-sans font-semibold text-zinc-400">Elevation Shadow Strength</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['none', 'sm', 'lg', 'xl'] as const).map((s) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={s}
                        onClick={() => setCardShadow(s)}
                        className={`py-1 rounded text-[10px] font-semibold border transition cursor-pointer ${
                          cardShadow === s
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        {s.toUpperCase()}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Accent modifier */}
                <div className="space-y-2 text-xs font-sans">
                  <span className="font-sans font-semibold text-zinc-400">Brand Palette Focus</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['indigo', 'emerald', 'amber', 'neutral'] as const).map((col) => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={col}
                        onClick={() => setAccentColor(col)}
                        className={`py-1 rounded text-[10px] font-semibold border transition capitalize cursor-pointer ${
                          accentColor === col
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        {col}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Layout density helper */}
                <div className="space-y-2 text-xs font-sans">
                  <span className="font-sans font-semibold text-zinc-400">Gutter Padding Grid</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLayoutDensity('snug')}
                      className={`py-1.5 rounded text-[10px] font-semibold border transition cursor-pointer ${
                        layoutDensity === 'snug' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      SNUG (Compact)
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLayoutDensity('relaxed')}
                      className={`py-1.5 rounded text-[10px] font-semibold border transition cursor-pointer ${
                        layoutDensity === 'relaxed' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      RELAXED (Comfort)
                    </motion.button>
                  </div>
                </div>

              </div>

              {/* Real-time Rendering Column */}
              <div className="md:col-span-7 flex items-center justify-center bg-zinc-950 rounded-xl p-4 sm:p-8 border border-zinc-800 min-h-[300px]">
                <div className="w-full max-w-sm space-y-4">
                  <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-widest block text-center font-mono">LIVE RENDERED PREVIEW</span>

                  {/* Dynamic Styled Container Card */}
                  <motion.div
                    layout
                    className={`bg-zinc-900 border border-zinc-800 transition-all duration-300 ${
                      layoutDensity === 'relaxed' ? 'p-6' : 'p-3.5'
                    } ${
                      cardRadius === 'none' ? 'rounded-none' :
                      cardRadius === 'md' ? 'rounded-md' :
                      cardRadius === 'xl' ? 'rounded-xl' : 'rounded-3xl'
                    } ${
                      cardShadow === 'none' ? 'shadow-none' :
                      cardShadow === 'sm' ? 'shadow-sm' :
                      cardShadow === 'lg' ? 'shadow-lg shadow-black/40' : 'shadow-2xl shadow-black/80'
                    }`}
                  >
                    {/* Element header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${
                          accentColor === 'indigo' ? 'bg-indigo-500' :
                          accentColor === 'emerald' ? 'bg-emerald-500' :
                          accentColor === 'amber' ? 'bg-amber-500' : 'bg-zinc-400'
                        }`} />
                        <span className="text-[10px] font-bold font-mono tracking-wide text-zinc-300 font-mono">TahaStudio_UI</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium font-sans">100% Client Success</span>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-sans text-sm font-bold text-white">
                        Precision Rendered Container Models
                      </h5>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        By modifying the controls on the left, you are dynamically changing React states that map to tailored Tailwind CSS class strings.
                      </p>

                      <motion.button
                        layout
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-2.5 px-4 text-xs font-bold text-white transition-all text-center rounded-lg cursor-pointer ${
                          accentColor === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-500' :
                          accentColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' :
                          accentColor === 'amber' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-zinc-800 hover:bg-zinc-700'
                        }`}
                      >
                        Interactive Component Action
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>
          ) : (
            /* SIMULATOR 2: Checkout / Promo Code Engine */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Basket simulation items */}
              <div className="md:col-span-6 bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4">
                <h4 className="font-sans text-xs font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-emerald-400" />
                  <span>Shopping Cart Items Specification</span>
                </h4>

                <div className="divide-y divide-zinc-800">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-sans font-semibold text-zinc-100 block">{item.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">Digital Deliverable File Code</span>
                      </div>
                      <span className="font-mono font-bold text-white">${item.price} USD</span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Entry Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-3 border-t border-zinc-800">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                    Apply Studio Promo Code
                  </label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter TAHADEV or PARTNER"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-white pl-3 pr-2 py-2 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-1 uppercase font-mono"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-md transition cursor-pointer"
                    >
                      Verify
                    </motion.button>
                  </div>

                  {couponFeedback && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[10px] font-sans font-medium ${
                        discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {couponFeedback}
                    </motion.p>
                  )}
                </form>
              </div>

              {/* Calculations receipts panel */}
              <div className="md:col-span-6 bg-[#0e0e11] text-white rounded-xl p-5 flex flex-col justify-between border border-zinc-800">
                <div>
                  <span className="text-[9px] uppercase font-mono text-zinc-500 font-bold tracking-wider">Live Checkout Computations</span>
                  <h5 className="font-sans text-sm font-bold text-zinc-100 mt-2 border-b border-zinc-800 pb-2 font-sans">Investment Bill Receipt</h5>
                  
                  <div className="space-y-2.5 pt-3 text-xs font-sans">
                    <div className="flex justify-between text-zinc-400 font-sans font-sans">
                      <span>Gross Subtotal:</span>
                      <span className="font-mono text-zinc-300 font-semibold">${cartTotalRaw} USD</span>
                    </div>

                    <div className="flex justify-between text-zinc-400 font-sans font-sans">
                      <span>Applied Discount (%{discountPercent}):</span>
                      <span className="font-mono text-emerald-400 font-semibold">-${discountUSD} USD</span>
                    </div>

                    <div className="flex justify-between text-emerald-400 border-t border-dashed border-zinc-800 pt-2 font-bold font-sans">
                      <span>Net Investment Payable:</span>
                      <span className="font-mono">${finalCartTotal} USD</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-4 rounded-md">
                  <p className="text-[10px] font-sans text-zinc-500 leading-relaxed font-sans">
                    *The above coupon verifier logic runs a clean React condition handler, confirming the correct application of multi-stage state calculations instantly on the static page.
                  </p>
                </div>
              </div>

            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
