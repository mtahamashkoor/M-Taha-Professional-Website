/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { SERVICE_PACKAGES, CUSTOM_FEATURES } from '../data';
import { ServiceTierType, ClientInquiry } from '../types';
import { Sparkles, Check, ChevronRight, RefreshCw, Smartphone, Laptop, Database, Globe, Sliders, DollarSign, Send, CheckCircle, MessageSquare } from 'lucide-react';

interface QuotePlannerProps {
  onAddInquiry: (inquiry: ClientInquiry) => void;
}

export default function QuotePlanner({ onAddInquiry }: QuotePlannerProps) {
  // Config state
  const [selectedPackageId, setSelectedPackageId] = useState<ServiceTierType>('landing');
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([]);
  const [timelineMode, setTimelineMode] = useState<'urgent' | 'standard' | 'flexible'>('standard');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Client form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [submissionType, setSubmissionType] = useState<'lead' | 'message'>('lead');
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedInquiry, setLastSubmittedInquiry] = useState<ClientInquiry | null>(null);

  // Selected base package
  const selectedPackage = useMemo(() => {
    return SERVICE_PACKAGES.find(pkg => pkg.id === selectedPackageId) || SERVICE_PACKAGES[0];
  }, [selectedPackageId]);

  // Selected features list
  const selectedFeatures = useMemo(() => {
    return CUSTOM_FEATURES.filter(feat => selectedFeatureIds.includes(feat.id));
  }, [selectedFeatureIds]);

  // Pricing calculation
  const calculations = useMemo(() => {
    // Collect base prices
    let usdTotal = selectedPackage.basePriceUSD;
    let pkrTotal = selectedPackage.basePricePKR;
    let daysTotal = selectedPackage.estimatedDays;

    // Add selected features cost
    selectedFeatures.forEach(feat => {
      usdTotal += feat.costUSD;
      pkrTotal += feat.costPKR;
    });

    // Apply timeline modifiers
    let timelineModifier = 1.0;
    if (timelineMode === 'urgent') {
      timelineModifier = 1.25; // 25% rush charge
      daysTotal = Math.ceil(daysTotal * 0.65); // 35% time reduction
    } else if (timelineMode === 'flexible') {
      timelineModifier = 0.93; // 7% flexible discount
      daysTotal = Math.ceil(daysTotal * 1.3); // 30% extra timeline buffering
    }

    usdTotal = Math.round(usdTotal * timelineModifier);
    pkrTotal = Math.round(pkrTotal * timelineModifier);

    return {
      usd: usdTotal,
      pkr: pkrTotal,
      days: daysTotal
    };
  }, [selectedPackage, selectedFeatures, timelineMode]);

  // Add/remove a feature
  const handleToggleFeature = (featureId: string) => {
    setSelectedFeatureIds(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Handle contact form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const newId = 'inq_' + Math.random().toString(36).substr(2, 9);
    const inquiry: ClientInquiry = {
      id: newId,
      clientName,
      clientEmail,
      clientCompany: clientCompany || undefined,
      clientPhone: clientPhone || undefined,
      serviceType: selectedPackageId,
      additionalFeatures: [...selectedFeatureIds],
      timelineRequirement: timelineMode,
      estimatedCostUSD: calculations.usd,
      estimatedCostPKR: calculations.pkr,
      estimatedTimelineDays: calculations.days,
      clientMessage: clientMessage || (submissionType === 'lead' ? 'Interested in starting a discussion based on this quotation estimation.' : 'Sending general question regarding web engineering services.'),
      submissionType,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    onAddInquiry(inquiry);
    setLastSubmittedInquiry(inquiry);
    setSubmitted(true);
  };

  // Reset calculator
  const handleReset = () => {
    setSelectedPackageId('landing');
    setSelectedFeatureIds([]);
    setTimelineMode('standard');
    setClientName('');
    setClientEmail('');
    setClientCompany('');
    setClientPhone('');
    setClientMessage('');
    setSubmissionType('lead');
    setSubmitted(false);
    setLastSubmittedInquiry(null);
  };

  // Construct a professional WhatsApp payload
  const whatsappUrl = useMemo(() => {
    if (!lastSubmittedInquiry) return '';
    const pkgTitle = SERVICE_PACKAGES.find(p => p.id === lastSubmittedInquiry.serviceType)?.title || '';
    const textLines = [
      `*New Project Plan | M Taha Web Solutions*`,
      `*Client:* ${lastSubmittedInquiry.clientName}`,
      `*Company:* ${lastSubmittedInquiry.clientCompany || 'N/A'}`,
      `*Service Package:* ${pkgTitle}`,
      `*Timeline Preference:* ${lastSubmittedInquiry.timelineRequirement.toUpperCase()}`,
      `*Calculated Blueprint Quote:*`,
      ` - PKR ${lastSubmittedInquiry.estimatedCostPKR.toLocaleString()}`,
      ` - USD $${lastSubmittedInquiry.estimatedCostUSD.toLocaleString()}`,
      ` - Delivery: ~${lastSubmittedInquiry.estimatedTimelineDays} Business Days`,
      `*Client Note:* "${lastSubmittedInquiry.clientMessage}"`,
      `Please review my project details and let's schedule an initial onboarding call.`
    ];
    return `https://wa.me/923169668028?text=${encodeURIComponent(textLines.join('\n'))}`;
  }, [lastSubmittedInquiry]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#121215]/90 p-6 md:p-8 shadow-2xl text-white" id="project-planner">
      <div className="mb-8 border-b border-zinc-850 pb-6 text-center sm:text-left">
        <h3 className="font-sans text-2xl font-bold tracking-tight text-white">
          Interactive Design & Architecture Quote Planner
        </h3>
        <p className="font-sans text-sm text-zinc-400 mt-1">
          Select packages, customise core functional specs, and estimate budget metrics immediately.
        </p>
      </div>

      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Controls Panel */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base Tier Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Step 01: Select Project Base Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICE_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                      selectedPackageId === pkg.id
                        ? 'border-emerald-500 bg-zinc-900/90 ring-2 ring-emerald-500/10 shadow-xl'
                        : 'border-zinc-800 bg-zinc-950/20 hover:border-zinc-700 hover:bg-zinc-950/40'
                    }`}
                  >
                    {selectedPackageId === pkg.id && (
                      <span className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                    <h5 className="font-sans text-xs font-bold text-white">{pkg.title}</h5>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{pkg.shortDesc}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono font-semibold text-zinc-500 font-sans">Base Cost:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {currency === 'PKR' ? `PKR ${pkg.basePricePKR.toLocaleString()}` : `$${pkg.basePriceUSD}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Custom Core Add-ons */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Step 02: Add Functional Modules / Specs Add-ons
              </label>
              <div className="space-y-2">
                {CUSTOM_FEATURES.map((feature) => {
                  const isSelected = selectedFeatureIds.includes(feature.id);
                  return (
                    <div
                      key={feature.id}
                      onClick={() => handleToggleFeature(feature.id)}
                      className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-zinc-900/60'
                          : 'border-zinc-800 bg-zinc-950/20 hover:border-zinc-700 hover:bg-zinc-950/40'
                      }`}
                    >
                      <div className="flex items-start gap-3 max-w-[80%]">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // click managed by div
                          className="mt-1 h-3.5 w-3.5 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-zinc-900 cursor-pointer"
                        />
                        <div>
                          <h6 className="font-sans text-xs font-semibold text-white">{feature.name}</h6>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 whitespace-nowrap">
                        +{currency === 'PKR' ? `PKR ${feature.costPKR.toLocaleString()}` : `$${feature.costUSD}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Timeline Schedule */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Step 03: Delivery Priority & Timeline
              </label>
              <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setTimelineMode('flexible')}
                  className={`py-2 text-center rounded-md text-[11px] font-sans font-bold transition-all cursor-pointer ${
                    timelineMode === 'flexible'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Flexible (-7% Quote)
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineMode('standard')}
                  className={`py-2 text-center rounded-md text-[11px] font-sans font-bold transition-all cursor-pointer ${
                    timelineMode === 'standard'
                      ? 'bg-zinc-800 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Standard Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineMode('urgent')}
                  className={`py-2 text-center rounded-md text-[11px] font-sans font-bold transition-all cursor-pointer ${
                    timelineMode === 'urgent'
                      ? 'bg-emerald-600 text-white shadow font-extrabold'
                      : 'text-zinc-400 hover:text-emerald-450'
                  }`}
                >
                  Urgent (+25% Rush)
                </button>
              </div>
            </div>

          </div>

          {/* Right Estimation & Contact Form Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Pricing Estimation Summary */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-semibold">Live Summary Cost</span>
                <button
                  type="button"
                  onClick={() => setCurrency(prev => prev === 'PKR' ? 'USD' : 'PKR')}
                  className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-[9px] font-mono text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
                >
                  <RefreshCw className="h-2.5 w-2.5" />
                  <span>Switch to {currency === 'PKR' ? 'USD' : 'PRK'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Total Estimated Investment:</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono text-3xl font-extrabold tracking-tight text-white">
                      {currency === 'PKR' 
                        ? `PKR ${calculations.pkr.toLocaleString()}` 
                        : `$${calculations.usd.toLocaleString()}`
                      }
                    </span>
                    <span className="text-zinc-500 text-xs font-semibold">
                      ({currency === 'PKR' ? `$${calculations.usd}` : `PKR ${calculations.pkr.toLocaleString()}`})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Deliverable Timeline:</span>
                    <span className="font-mono text-sm font-bold text-white mt-0.5 block">
                      ~ {calculations.days} working days
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Scope Blueprint:</span>
                    <span className="font-sans text-xs font-semibold text-emerald-400 mt-0.5 block">
                      {selectedPackage.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="border border-zinc-800 rounded-xl p-4 space-y-3 bg-zinc-950/40 backdrop-blur-sm">
              <h4 className="font-sans text-xs font-bold text-zinc-100 border-b border-zinc-800 pb-2">
                Register Specification & Request Call
              </h4>

              {/* Submission Type Option selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block font-mono">
                  Submit Specification As:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSubmissionType('lead')}
                    className={`py-2 text-center rounded-lg border font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      submissionType === 'lead'
                        ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                        : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Project Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionType('message')}
                    className={`py-2 text-center rounded-lg border font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      submissionType === 'message'
                        ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                        : 'border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>General Message</span>
                  </button>
                </div>
              </div>
              
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name (Required)"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 rounded-md bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Business Email (Required)"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 rounded-md bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={clientCompany}
                  onChange={e => setClientCompany(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 rounded-md bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  type="tel"
                  placeholder="Phone (WhatsApp/SMS)"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 rounded-md bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <textarea
                  placeholder="Additional Custom Specifications or Project Scope details..."
                  rows={2}
                  value={clientMessage}
                  onChange={e => setClientMessage(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-800 rounded-md bg-zinc-950 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 py-3.5 text-xs font-bold text-white transition-all hover:bg-emerald-500 cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <Send className="h-3.5 w-3.5 text-white" />
                <span>Submit & Compile Specs</span>
              </button>
            </form>

          </div>

        </div>
      ) : (
        /* Submission Success Message Card */
        <div className="py-8 text-center max-w-xl mx-auto space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 shadow-sm animate-pulse">
            {submissionType === 'lead' ? (
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            ) : (
              <MessageSquare className="h-8 w-8 text-emerald-400" />
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-sans text-xl font-bold text-white">Assalam-o-Alaikum, {clientName}!</h4>
            <div className="font-sans text-xs text-zinc-300 leading-relaxed space-y-2">
              {submissionType === 'lead' ? (
                <p className="bg-emerald-950/30 border border-emerald-900 px-3 py-2.5 rounded-lg text-emerald-300 flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Interactive Project Lead successfully logged into the live Admin Dashboard!</span>
                </p>
              ) : (
                <p className="bg-blue-950/30 border border-blue-900 px-3 py-2.5 rounded-lg text-blue-300 flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span>General Inquiry Message dispatched directly to Taha's Lead center!</span>
                </p>
              )}
              <p className="text-zinc-400 leading-relaxed pt-1">
                Your specifications have been captured. M Taha will review the requirements with rigorous professional standards and respond within 24 hours.
              </p>
            </div>
          </div>

          <div className="border border-zinc-805 border-zinc-800 rounded-xl p-4 bg-zinc-950/60 space-y-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Quotation Summary Receipt</p>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans text-left text-zinc-400 max-w-sm mx-auto">
              <span>Selected Scope:</span>
              <strong className="text-white block text-right">{selectedPackage.title}</strong>
              
              <span>Timeline:</span>
              <strong className="text-white block text-right">{timelineMode.toUpperCase()}</strong>

              <span>Cost Estimate:</span>
              <strong className="text-white block text-right">PKR {calculations.pkr.toLocaleString()}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Connect on WhatsApp Now</span>
            </a>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs font-semibold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              <span>Build Another Quotation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
