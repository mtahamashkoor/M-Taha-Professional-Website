/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import QuotePlanner from './components/QuotePlanner';
import LeadDashboard from './components/LeadDashboard';
import AdminLockScreen from './components/AdminLockScreen';
import ConceptWork from './components/ConceptWork';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { ClientInquiry, ServiceTierType } from './types';
import { SERVICE_PACKAGES, INITIAL_INQUIRIES } from './data';
import { Code2, ArrowUpRight, Zap, Target, BookOpen, Layers } from 'lucide-react';

const STORAGE_KEY = 'taha_web_solutions_inquiries_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('taha_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Keep html class in sync with theme state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('taha_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load inquiries from server on mount
  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => {
        if (!res.ok) throw new Error('Server response not ok');
        return res.json();
      })
      .then(data => {
        setInquiries(data);
        if (data && data.length > 0) {
          setSelectedInquiryId(data[0].id);
        }
      })
      .catch(err => {
        console.error('Error fetching inquiries from server:', err);
        // Fallback to localStorage if server has issues or in offline-dev
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            setInquiries(parsed);
            if (parsed && parsed.length > 0) {
              setSelectedInquiryId(parsed[0].id);
            }
          } catch (e) {
            setInquiries(INITIAL_INQUIRIES);
            if (INITIAL_INQUIRIES.length > 0) {
              setSelectedInquiryId(INITIAL_INQUIRIES[0].id);
            }
          }
        } else {
          setInquiries(INITIAL_INQUIRIES);
          if (INITIAL_INQUIRIES.length > 0) {
            setSelectedInquiryId(INITIAL_INQUIRIES[0].id);
          }
        }
      });
  }, []);

  // Callback to register a new client quote submission
  const handleAddInquiry = (newInquiry: ClientInquiry) => {
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save inquiry');
        return res.json();
      })
      .then(savedInquiry => {
        setInquiries(prev => {
          const updated = [savedInquiry, ...prev];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setSelectedInquiryId(savedInquiry.id);
      })
      .catch(err => {
        console.error('Error saving inquiry to server:', err);
        setInquiries(prev => {
          const updated = [newInquiry, ...prev];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setSelectedInquiryId(newInquiry.id);
      });
  };

  // Callback to update status or logs of an inquiry (admin panel)
  const handleUpdateInquiry = (updatedInquiry: ClientInquiry) => {
    fetch(`/api/inquiries/${updatedInquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInquiry)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update inquiry');
        return res.json();
      })
      .then(saved => {
        setInquiries(prev => {
          const updated = prev.map(inq => inq.id === saved.id ? saved : inq);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      })
      .catch(err => {
        console.error('Error updating inquiry on server:', err);
        setInquiries(prev => {
          const updated = prev.map(inq => inq.id === updatedInquiry.id ? updatedInquiry : inq);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      });
  };

  // Callback to delete an inquiry (admin panel)
  const handleDeleteInquiry = (id: string) => {
    fetch(`/api/inquiries/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete inquiry');
        return res.json();
      })
      .then(() => {
        setInquiries(prev => {
          const updated = prev.filter(inq => inq.id !== id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        if (selectedInquiryId === id) {
          setSelectedInquiryId(null);
        }
      })
      .catch(err => {
        console.error('Error deleting inquiry from server:', err);
        setInquiries(prev => {
          const updated = prev.filter(inq => inq.id !== id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        if (selectedInquiryId === id) {
          setSelectedInquiryId(null);
        }
      });
  };

  // Callback for Taha to simulate addition of prospective client mock leads
  const handleAddMockInquiry = () => {
    const names = ['Kashif Shah', 'Zarak Mahmood', 'Dr. Farhana', 'Umer Farooq', 'Sher Khan'];
    const emails = ['kashif@shahco.pk', 'zarak@kohattech.com', 'farhana.clinic@gmail.com', 'umer.farooq@jinnah.edu', 'sher@peshawarmarbles.com'];
    const companies = ['Shah Logistics Rawalpindi', 'Kohat Software Guild', 'Farhana Clinic Peshawar', 'Jinnah Tech Academy', 'Peshawar Marble Hub'];
    const services: ServiceTierType[] = ['landing', 'business', 'ecommerce', 'custom'];
    const messages = [
      'Assalam-o-Alaikum Taha. We need a basic shipping tracker lander configured using React & tailwind.',
      'We noticed your high-quality engineering portfolios. We would love to commission you for a student portal portal.',
      'Need a bilingual consultation page for our Peshawar clinic. Price estimation seems fitting.',
      'Can you set up an e-commerce checkout page mockup so our team can visualize payment gateways?',
      'Interested in bespoke database sync options for our retail inventory. Please send follow-up schedules.'
    ];

    const randIndex = Math.floor(Math.random() * names.length);
    const mockId = 'inq_mock_' + Math.random().toString(36).substr(2, 5);
    
    const newMock: ClientInquiry = {
      id: mockId,
      clientName: names[randIndex],
      clientEmail: emails[randIndex],
      clientCompany: companies[randIndex],
      clientPhone: '+923169668028', // updated default phone number!
      serviceType: services[Math.floor(Math.random() * services.length)],
      additionalFeatures: ['seo_pro'],
      timelineRequirement: 'standard',
      estimatedCostUSD: 50,
      estimatedCostPKR: 14000,
      estimatedTimelineDays: 10,
      clientMessage: messages[randIndex],
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMock)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save mock inquiry');
        return res.json();
      })
      .then(saved => {
        setInquiries(prev => {
          const updated = [saved, ...prev];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setSelectedInquiryId(saved.id);
      })
      .catch(err => {
        console.error('Error adding mock inquiry via server:', err);
        setInquiries(prev => {
          const updated = [newMock, ...prev];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setSelectedInquiryId(newMock.id);
      });
  };

  // Unread badge items (inquiries classified as "New")
  const unreadCount = inquiries.filter(inq => inq.status === 'New').length;

  // Helper inside App.tsx to handle layout scrolling smoothly
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Top Floating Branding Banner & Nav */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          // Auto-scroll to top when switching perspectives
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        unreadInquiriesCount={unreadCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {activeTab === 'client' ? (
        /* PORTFOLIO & PROPOSAL CLIENT VIEW */
        <main className="space-y-16 pb-16">
          
          {/* Hero segment */}
          <Hero onScrollToCalculator={() => handleScrollToSection('project-planner')} />

          {/* Interactive Capabilities Showcase Grid */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ConceptWork />
          </div>

          {/* Service packages tiers card overview */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="services">
            <div className="text-center md:text-left mb-10 pb-4 border-b border-zinc-800">
              <h3 className="font-sans text-2xl font-bold tracking-tight text-white border-none">
                Service Tiers & Architecture Blueprint Catalog
              </h3>
              <p className="font-sans text-sm text-zinc-400 mt-1">
                Standard corporate software solutions built on absolute performance standards and strict milestone schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {SERVICE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/80 transition duration-300"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 capitalize bg-emerald-950/40 border border-emerald-900/50 rounded px-2 py-0.5 inline-block">
                      {pkg.id === 'custom' ? 'Enterprise Tier' : `${pkg.id} Base`}
                    </span>
                    
                    <div>
                      <h4 className="font-sans text-sm font-bold text-white">{pkg.title}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-3">
                        {pkg.shortDesc}
                      </p>
                    </div>

                    <div className="border-t border-zinc-800 pt-3 space-y-2">
                      <span className="text-[10px] font-mono font-semibold text-zinc-500 block uppercase">Includes Specs:</span>
                      <ul className="space-y-1.5">
                        {pkg.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="text-[11px] text-zinc-300 flex gap-1.5 items-start font-sans">
                            <span className="text-emerald-500 font-bold mt-0.5 text-xs select-none">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="text-[10px] text-zinc-500 italic">+{pkg.features.length - 3} auxiliary specs</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-4 mt-5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-sans font-medium text-zinc-500">Starting at:</span>
                      <strong className="font-mono text-base font-extrabold text-emerald-400">
                        PKR {pkg.basePricePKR.toLocaleString()}
                      </strong>
                    </div>

                    <p className="text-[10px] text-zinc-500 mt-1 font-mono text-right">/ Approx. ${pkg.basePriceUSD} USD</p>
                    
                    <button
                      type="button"
                      onClick={() => {
                        handleScrollToSection('project-planner');
                        // Optional scroll interaction: custom config can focus elements
                      }}
                      className="w-full mt-4 inline-flex items-center justify-center gap-1.5 border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 py-2.5 rounded-lg text-xs font-bold text-zinc-200 font-sans transition"
                    >
                      <span>Customise & Estimate Cost</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Quotation Form Calculator */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <QuotePlanner onAddInquiry={handleAddInquiry} />
          </section>

          {/* About section containing Cadet College legacy details */}
          <AboutSection />

          {/* Contact coordinates & geographic credentials */}
          <ContactSection />

        </main>
      ) : (
        /* PERSISTENT WEB CRM BUSINESS DASHBOARD VIEW */
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
          {!isAdminUnlocked ? (
            <AdminLockScreen onUnlock={() => setIsAdminUnlocked(true)} />
          ) : (
            <LeadDashboard
              inquiries={inquiries}
              selectedInquiryId={selectedInquiryId}
              onSelectInquiry={setSelectedInquiryId}
              onUpdateInquiry={handleUpdateInquiry}
              onDeleteInquiry={handleDeleteInquiry}
              onAddMockInquiry={handleAddMockInquiry}
              onLock={() => setIsAdminUnlocked(false)}
            />
          )}
        </main>
      )}
    </div>
  );
}
