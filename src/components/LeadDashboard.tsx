/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { ClientInquiry, LeadStatus, DashboardMetrics, ServiceTierType } from '../types';
import { SERVICE_PACKAGES, CUSTOM_FEATURES } from '../data';

// Custom adaptive Tooltip for Recharts Sales pipeline bar chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900/95 border border-zinc-800 p-3 rounded-xl shadow-2xl text-xs font-sans space-y-1 backdrop-blur-sm z-50">
        <p className="font-bold text-white font-sans">{data.status}</p>
        <p className="font-semibold text-emerald-400 font-sans">
          Leads: <span className="font-mono">{data.count}</span>
        </p>
      </div>
    );
  }
  return null;
};
import { 
  Users, TrendingUp, Inbox, CheckCircle2, Search, Filter, 
  MessageSquare, FileText, ChevronRight, Save, Trash2, Globe, Clock, PlusSquare, ArrowUpRight 
} from 'lucide-react';

interface LeadDashboardProps {
  inquiries: ClientInquiry[];
  selectedInquiryId: string | null;
  onSelectInquiry: (id: string | null) => void;
  onUpdateInquiry: (updated: ClientInquiry) => void;
  onDeleteInquiry: (id: string) => void;
  onAddMockInquiry: () => void;
}

export default function LeadDashboard({ 
  inquiries, 
  selectedInquiryId, 
  onSelectInquiry, 
  onUpdateInquiry, 
  onDeleteInquiry, 
  onAddMockInquiry 
}: LeadDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  
  // Custom non-intrusive toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  
  // State for active note editing
  const [editingNotes, setEditingNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState<LeadStatus>('New');
  const [editingIsPriority, setEditingIsPriority] = useState(false);

  // Currently selected lead
  const selectedInquiry = useMemo(() => {
    const found = inquiries.find(inq => inq.id === selectedInquiryId);
    if (found) {
      // Keep notes & status editing synced
      return found;
    }
    return null;
  }, [inquiries, selectedInquiryId]);

  // Synchronize draft states when selected inquiry changes
  React.useEffect(() => {
    if (selectedInquiry) {
      setEditingNotes(selectedInquiry.adminNotes || '');
      setEditingStatus(selectedInquiry.status);
      setEditingIsPriority(!!selectedInquiry.isPriority);
    }
  }, [selectedInquiryId, selectedInquiry]);

  // Calculations for KPI cards
  const metrics = useMemo<DashboardMetrics>(() => {
    let newL = 0;
    let disc = 0;
    let active = 0;
    let totUSD = 0;
    let totPKR = 0;

    inquiries.forEach(inq => {
      totUSD += inq.estimatedCostUSD;
      totPKR += inq.estimatedCostPKR;
      if (inq.status === 'New') newL++;
      if (inq.status === 'In Discussion') disc++;
      if (inq.status === 'In Progress') active++;
    });

    return {
      totalLeads: inquiries.length,
      newLeads: newL,
      inDiscussionLeads: disc,
      activeProjects: active,
      totalPipelineUSD: totUSD,
      totalPipelinePKR: totPKR
    };
  }, [inquiries]);

  // Custom colors for each sales pipeline stage
  const STATUS_COLORS: Record<LeadStatus, string> = {
    'New': '#3b82f6',          // blue-500
    'In Discussion': '#a855f7', // purple-500
    'Contract Sent': '#eab308', // yellow-500
    'In Progress': '#4f46e5',  // indigo-600
    'Completed': '#10b981',    // emerald-500
    'Archived': '#71717a',     // zinc-500
  };

  // Process inquiries counts to prepare data for Recharts sales pipeline visualization
  const chartData = useMemo(() => {
    const counts: Record<LeadStatus, number> = {
      'New': 0,
      'In Discussion': 0,
      'Contract Sent': 0,
      'In Progress': 0,
      'Completed': 0,
      'Archived': 0,
    };
    
    inquiries.forEach(inq => {
      if (counts[inq.status] !== undefined) {
        counts[inq.status]++;
      }
    });

    return (Object.keys(counts) as LeadStatus[]).map(statusKey => ({
      status: statusKey,
      count: counts[statusKey],
      fill: STATUS_COLORS[statusKey]
    }));
  }, [inquiries]);

  // Filtered inquiries list
  const filteredInquiries = useMemo(() => {
    const sortedAndFiltered = inquiries.filter(inq => {
      const matchesSearch = 
        inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inq.clientCompany && inq.clientCompany.toLowerCase().includes(searchTerm.toLowerCase())) ||
        inq.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' ? true : inq.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...sortedAndFiltered].sort((a, b) => {
      const aVal = a.isPriority ? 1 : 0;
      const bVal = b.isPriority ? 1 : 0;
      if (aVal !== bVal) {
        return bVal - aVal; // priority first
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // newest first
    });
  }, [inquiries, searchTerm, statusFilter]);

  // Action: Save notes/status edits
  const handleSaveEdits = () => {
    if (!selectedInquiry) return;
    const updated: ClientInquiry = {
      ...selectedInquiry,
      status: editingStatus,
      adminNotes: editingNotes,
      isPriority: editingIsPriority
    };
    onUpdateInquiry(updated);
    
    // Quick notification toast alternative
    showToast('Lead client dossier successfully updated.');
  };

  // Helper: display human readable service titles
  const getServiceTitle = (tier: ServiceTierType) => {
    return SERVICE_PACKAGES.find(p => p.id === tier)?.title || tier;
  };

  // Helper: map statuses to beautiful pill colors
  const getStatusColorClass = (status: LeadStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-950/80 text-blue-400 border-blue-900/50';
      case 'In Discussion': return 'bg-purple-950/80 text-purple-400 border-purple-900/50';
      case 'Contract Sent': return 'bg-yellow-950/80 text-yellow-500 border-yellow-900/50';
      case 'In Progress': return 'bg-indigo-950/80 text-indigo-400 border-indigo-900/50';
      case 'Completed': return 'bg-emerald-900/30 text-emerald-400 border-emerald-900/50';
      case 'Archived': return 'bg-zinc-950 text-zinc-400 border-zinc-800';
    }
  };

  // Helper: calculate lead timeline progress percentage based on created date versus estimated days
  const getTimelineProgress = (inq: ClientInquiry) => {
    if (inq.status === 'Completed') return 100;
    if (inq.status === 'Archived') return 100;
    if (!inq.createdAt || !inq.estimatedTimelineDays) return 0;
    
    const createdTime = new Date(inq.createdAt).getTime();
    // Use the fixed/stub date for testing or current time. Here new Date().getTime() is standard.
    const currentTime = new Date().getTime();
    const elapsedMs = currentTime - createdTime;
    const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
    const totalDays = inq.estimatedTimelineDays;
    
    if (totalDays <= 0) return 0;
    
    const percent = (elapsedDays / totalDays) * 100;
    return Math.min(100, Math.max(0, Math.round(percent)));
  };

  // Build standard outreach text lines
  const buildOutreachTemplate = (type: 'email' | 'whatsapp') => {
    if (!selectedInquiry) return '';
    const name = selectedInquiry.clientName;
    const pricePKR = selectedInquiry.estimatedCostPKR.toLocaleString();
    const timeline = selectedInquiry.estimatedTimelineDays;
    
    if (type === 'email') {
      return `Subject: Proposal for M Taha Web Solutions - ${getServiceTitle(selectedInquiry.serviceType)}\n\nAssalam-o-Alaikum ${name},\n\nThank you for reaching out to M Taha Web Solutions regarding your upcoming project needs. I have carefully reviewed your registered blueprint configuration:\n\n- Scope: ${getServiceTitle(selectedInquiry.serviceType)}\n- Additional Custom Details: ${selectedInquiry.additionalFeatures.map(f => CUSTOM_FEATURES.find(cf => cf.id === f)?.name).join(', ') || 'None'}\n- Projected Cost Estimate: PKR ${pricePKR}\n- Delivery Timeline: ~${timeline} Business Days\n\nI am fully prepared to discuss how my high-integrity, discipline-focused values will translate into high-end delivery standards for your business.\n\nCould we schedule an onboarding call this week?\n\nBest Regards,\nM Taha\nM Taha Web Solutions | +92 3169668028`;
    } else {
      const waText = `Assalam-o-Alaikum ${name}! Thank you for registering your project plan with M Taha Web Solutions. I have completed my review on the ${getServiceTitle(selectedInquiry.serviceType)} specification (Projected Cost: PKR ${pricePKR}). When is a good time to call?`;
      return `https://wa.me/${selectedInquiry.clientPhone?.replace(/[^0-9]/g, '') || '923169668028'}?text=${encodeURIComponent(waText)}`;
    }
  };

  return (
    <div className="space-y-8" id="admin-dashboard">
      
      {/* Dashboard CRM Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl shadow-xl shadow-black/20">
        <div>
          <h3 className="font-sans text-xl font-bold text-white flex items-center gap-2">
            <span>Client Lead Center</span>
            <span className="inline-flex items-center rounded-full bg-emerald-950/60 border border-emerald-900/40 px-2 py-0.5 text-[10px] font-bold text-emerald-450 font-mono">
              SECURE WORKSPACE
            </span>
          </h3>
          <p className="font-sans text-xs text-zinc-400 mt-1">
            Exclusively for M Taha. Track inbound prospects, log negotiations, plan deliverables, and manage business growth.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMockInquiry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:text-white px-3.5 py-2 text-xs font-bold text-zinc-300 shadow-xl transition cursor-pointer"
        >
          <PlusSquare className="h-4 w-4 text-yellow-400" />
          <span>Inject Demo Lead</span>
        </button>
      </div>

      {/* Recharts Sales Pipeline Graphical Breakdown Card */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl shadow-xl shadow-black/15 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-sans text-sm font-bold text-white tracking-tight uppercase">
              Sales Pipeline breakdown
            </h4>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-450 bg-zinc-950 border border-zinc-850 px-2.5 py-1 rounded-full">
            {inquiries.length} Registered lead dossiers
          </span>
        </div>
        
        <div className="h-[210px] w-full text-zinc-400">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-zinc-800)" isFront={false} strokeOpacity={0.1} horizontal={false} />
              <XAxis 
                type="number" 
                stroke="var(--color-zinc-500)" 
                tickLine={false} 
                axisLine={false}
                allowDecimals={false}
                style={{ fontSize: '10px', fontFamily: 'monospace' }} 
              />
              <YAxis 
                dataKey="status" 
                type="category" 
                stroke="var(--color-zinc-300)" 
                tickLine={false} 
                axisLine={false}
                width={120}
                style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metric KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* KPI: Total Pipeline PKR */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">Project Budget Pipeline</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-mono text-xl font-extrabold text-white">PKR {metrics.totalPipelinePKR.toLocaleString()}</h4>
            <p className="text-[10px] text-zinc-400 font-mono mt-1">/ Approx. ${metrics.totalPipelineUSD.toLocaleString()} USD</p>
          </div>
        </div>

        {/* KPI: Total Leads */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 font-sans">Total dossiers</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h4 className="font-mono text-2xl font-bold text-white">{metrics.totalLeads} Records</h4>
            <p className="text-[10px] text-zinc-400 mt-1">{metrics.newLeads} pending review</p>
          </div>
        </div>

        {/* KPI: Discussion State */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 font-sans">Active Discussions</span>
            <Inbox className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <h4 className="font-mono text-2xl font-bold text-white">{metrics.inDiscussionLeads} Accounts</h4>
            <p className="text-[10px] text-zinc-400 mt-1 font-sans">Involved with negotiation blueprints</p>
          </div>
        </div>

        {/* KPI: Active Projects */}
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl p-5 shadow-xl shadow-black/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 font-sans">In Active Transit</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-mono text-2xl font-bold text-white">{metrics.activeProjects} Tiers</h4>
            <p className="text-[10px] text-zinc-400 mt-1 font-sans">Under strict military deadline models</p>
          </div>
        </div>

      </div>

      {/* Main Table + Detail Drawer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Table/List panel */}
        <div className="lg:col-span-7 bg-[#121215]/90 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-950/90 flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search clients / labels..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-zinc-800 rounded-md bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-3.5 w-3.5 text-zinc-500" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="text-xs border border-zinc-800 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-zinc-900 text-white cursor-pointer"
              >
                <option value="All">All statuses</option>
                <option value="New">New</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Contract Sent">Contract Sent</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

          </div>

          {/* List or Table */}
          {filteredInquiries.length > 0 ? (
            <div className="divide-y divide-zinc-800">
              {filteredInquiries.map((inq) => {
                const isSelected = selectedInquiryId === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => onSelectInquiry(inq.id)}
                    className={`p-4 transition cursor-pointer flex items-center justify-between ${
                      isSelected ? 'bg-zinc-900 border-l-2 border-yellow-400' : 'hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-[70%]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h5 className="font-sans text-xs font-bold text-white">{inq.clientName}</h5>
                        {inq.isPriority && (
                          <span className="inline-flex items-center rounded-full bg-rose-950/80 border border-rose-900 px-1.5 py-0.5 text-[8.5px] font-bold text-rose-450 uppercase tracking-wider animate-pulse whitespace-nowrap">
                            Priority
                          </span>
                        )}
                        {inq.clientCompany && (
                          <span className="text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 line-clamp-1">
                            {inq.clientCompany}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-mono text-zinc-405 text-zinc-400">{getServiceTitle(inq.serviceType)}</p>
                      <p className="text-[10px] text-zinc-505 text-zinc-500 line-clamp-1 italic">"{inq.clientMessage}"</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                      <span className="font-mono text-xs font-bold text-yellow-400">
                        PKR {inq.estimatedCostPKR.toLocaleString()}
                      </span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold ${getStatusColorClass(inq.status)}`}>
                        {inq.status}
                      </span>
                      
                      {/* Timeline progress bar */}
                      {(() => {
                        const progressPercent = getTimelineProgress(inq);
                        return (
                          <div className="w-24 mt-0.5 space-y-1" title={`Timeline Progress: ${progressPercent}% calculated from ${inq.estimatedTimelineDays} days estimated limit`}>
                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${progressPercent}%`, 
                                  backgroundColor: progressPercent === 100 ? '#10b981' : progressPercent > 50 ? '#f59e0b' : '#3b82f6' 
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 leading-none">
                              <span>Timeline</span>
                              <span className="font-bold text-zinc-350">{progressPercent}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-400 text-xs">
              No lead records match your search criteria. Try adjusting the query filter.
            </div>
          )}

        </div>

        {/* Selected Lead dossier detail drawer */}
        <div className="lg:col-span-5">
          {selectedInquiry ? (
            <motion.div
              key={selectedInquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#121215]/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6 text-white"
            >
              
              {/* Dossier Header */}
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold text-yellow-400 block uppercase tracking-widest">Client Dossier File</span>
                    {selectedInquiry.isPriority && (
                      <span className="inline-flex items-center rounded bg-rose-950 border border-rose-900 text-rose-400 text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider animate-pulse leading-none">
                        Priority
                      </span>
                    )}
                  </div>
                  <h4 className="font-sans text-base font-bold text-white mt-0.5">{selectedInquiry.clientName}</h4>
                  <p className="text-[10px] text-zinc-400">{selectedInquiry.clientEmail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const confirmDel = confirm('Are you sure you want to delete this lead document?');
                    if (confirmDel) {
                      onDeleteInquiry(selectedInquiry.id);
                      onSelectInquiry(null);
                    }
                  }}
                  className="p-1.5 hover:bg-rose-950/50 text-zinc-500 hover:text-rose-400 rounded-md transition cursor-pointer"
                  title="Delete lead"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Specs & Calculations breakdown */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">Scope Model:</span>
                  <span className="font-sans font-bold text-zinc-200 mt-0.5 block">{getServiceTitle(selectedInquiry.serviceType)}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">Timeline Mode:</span>
                  <span className="font-sans font-bold text-yellow-500 mt-0.5 block uppercase">{selectedInquiry.timelineRequirement}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">Budget Proposal:</span>
                  <span className="font-mono font-bold text-emerald-400 mt-0.5 block">PKR {selectedInquiry.estimatedCostPKR.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-sans">Days Committed:</span>
                  <span className="font-mono font-bold text-zinc-300 mt-0.5 block">~ {selectedInquiry.estimatedTimelineDays} days</span>
                </div>
              </div>

              {/* Sub-features requested */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-550 text-zinc-500 uppercase tracking-wider block">Selected Modules Addons:</span>
                {selectedInquiry.additionalFeatures.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedInquiry.additionalFeatures.map((fId) => (
                      <span key={fId} className="text-[9px] font-sans font-semibold text-zinc-300 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5">
                        {CUSTOM_FEATURES.find(cf => cf.id === fId)?.name || fId}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-zinc-400 italic">None selected</span>
                )}
              </div>

              {/* Original Client Message Input */}
              <div className="space-y-1 bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block font-mono">Original Message Prompt:</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans italic">
                  "{selectedInquiry.clientMessage}"
                </p>
              </div>

              {/* Status Update & Admin Notes Logger (State modification) */}
              <div className="space-y-3 pt-3 border-t border-zinc-800">
                <h5 className="font-sans text-xs font-bold text-white">Update Lead Action Plan</h5>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-zinc-450 text-zinc-400 w-16">Lead Status:</span>
                    <select
                      value={editingStatus}
                      onChange={e => setEditingStatus(e.target.value as LeadStatus)}
                      className="text-xs border border-zinc-800 rounded p-1.5 bg-zinc-900 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400 flex-1 cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Contract Sent">Contract Sent</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  {/* Flag for Priority Toggle */}
                  <div className="flex items-center justify-between bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-900/80 my-2 shadow-inner">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full transition-colors ${editingIsPriority ? 'bg-rose-500 animate-pulse' : 'bg-zinc-700'}`} />
                      <div className="flex flex-col">
                        <span className="text-[10.5px] font-bold text-zinc-200">Flag for Priority</span>
                        <span className="text-[9px] text-zinc-500">Bubble this lead to the top of list</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      id="priority-toggle-button"
                      onClick={() => setEditingIsPriority(p => !p)}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        editingIsPriority ? 'bg-rose-600 border-rose-500/30' : 'bg-zinc-800 border-zinc-700'
                      }`}
                      role="switch"
                      aria-checked={editingIsPriority}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out mt-[2px] ${
                          editingIsPriority ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-zinc-450 text-zinc-400 block">Follow-up Notes / History Logs:</label>
                    <textarea
                      value={editingNotes}
                      onChange={e => setEditingNotes(e.target.value)}
                      placeholder="Type logging actions... (e.g. Sardar Malik agreed on milestone 1 schedule, setup complete)"
                      rows={3}
                      className="w-full text-xs p-2 border border-zinc-800 rounded-md bg-zinc-900 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveEdits}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs py-2 w-full transition shadow-xl shadow-yellow-400/5 cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5 text-zinc-950" />
                    <span>Persist Dossier Changes</span>
                  </button>
                </div>
              </div>

              {/* Clipboard template builders to increase outreach */}
              <div className="space-y-2 pt-3 border-t border-zinc-800">
                <h5 className="font-sans text-xs font-bold text-white">Communication Utilities</h5>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(buildOutreachTemplate('email'));
                      showToast('Email template proposal copied to clipboard.');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 border border-zinc-800 rounded p-2 text-[10px] font-bold text-zinc-300 bg-zinc-950 hover:bg-zinc-900 transition-all cursor-pointer"
                  >
                    <FileText className="h-3 w-3 text-indigo-400" />
                    <span>Copy Proposal Draft</span>
                  </button>
                  
                  {selectedInquiry.clientPhone ? (
                    <a
                      href={buildOutreachTemplate('whatsapp')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 border border-zinc-800 rounded p-2 text-[10px] font-bold text-zinc-300 bg-zinc-950 hover:bg-indigo-950/20 transition-all cursor-pointer text-center"
                    >
                      <MessageSquare className="h-3 w-3 text-emerald-400" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-1.5 border border-zinc-900 rounded p-2 text-[10px] font-semibold text-zinc-600 bg-zinc-950 cursor-not-allowed opacity-50"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>No phone logged</span>
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-xs text-zinc-500 bg-zinc-900/30">
              Select any lead dossier on the left grid to view deep specifications, modify statuses, record timeline events, and trigger follow-up outreach.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
