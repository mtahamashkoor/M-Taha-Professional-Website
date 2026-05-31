/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServicePackage, QuoteFeature, ClientInquiry } from './types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'landing',
    title: 'Starter Single-Page Experience',
    shortDesc: 'A high-impact landing page styled with clean aesthetics and pixel-perfect responsiveness, designed to drive conversions.',
    basePriceUSD: 20,
    basePricePKR: 5000,
    estimatedDays: 5,
    features: [
      'Responsive modern design layout',
      'Contact / Lead Capture section',
      'Speed optimized with high lighthouse score',
      'Standard Google Fonts configuration',
      'Basic SEO groundwork setup'
    ]
  },
  {
    id: 'business',
    title: 'Multi-Page Corporate Portal',
    shortDesc: 'A comprehensive multi-page corporate website displaying complex services, custom galleries, and brand story.',
    basePriceUSD: 55,
    basePricePKR: 15000,
    estimatedDays: 12,
    features: [
      'Up to 6 fully custom crafted pages',
      'Interactive service showcases & catalog',
      'Advanced dynamic client filter lists',
      'Advanced SEO semantic structures',
      'Newsletter signup & form integrations'
    ]
  },
  {
    id: 'ecommerce',
    title: 'Custom E-Commerce Engine',
    shortDesc: 'Complete online storefront engineered with dynamic product configuration, cart handling, and secure checkout portals.',
    basePriceUSD: 125,
    basePricePKR: 35000,
    estimatedDays: 20,
    features: [
      'Dynamic product catalogue with custom search',
      'Shopping cart & mini-checkout mechanics',
      'Payment gateway checkout flow mockups',
      'Admin storage for order collections',
      'Advanced analytics integration triggers'
    ]
  },
  {
    id: 'custom',
    title: 'Bespoke Enterprise Web App',
    shortDesc: 'Custom dashboard interface built for high performance, custom state pipelines, and tailored workflow automation tools.',
    basePriceUSD: 270,
    basePricePKR: 75000,
    estimatedDays: 30,
    features: [
      'Bespoke state machine design architecture',
      'Interactive dashboard visualizers & charts',
      'Multi-tiered role authorization simulator',
      'Robust API endpoint synchronization',
      'Priority codebase handoff & setup logs'
    ]
  }
];

export const CUSTOM_FEATURES: QuoteFeature[] = [
  {
    id: 'seo_pro',
    name: 'Pro Technical SEO Package',
    description: 'Deep semantic metadata optimization, rich schema markup patterns, and complete sitemap architectures.',
    costUSD: 10,
    costPKR: 2500,
    category: 'marketing'
  },
  {
    id: 'db_int',
    name: 'Cloud Data Storage & Sync',
    description: 'Integration of custom database endpoints for durable inquiries or persistent catalogue updates.',
    costUSD: 20,
    costPKR: 5000,
    category: 'functional'
  },
  {
    id: 'dark_mode',
    name: 'Advanced Dark Mode & Micro-Animations',
    description: 'Dynamic light/dark theme toggles and tailored micro-animations using motion/react.',
    costUSD: 8,
    costPKR: 2000,
    category: 'design'
  },
  {
    id: 'multilingual',
    name: 'Multilingual Integration (English / Urdu)',
    description: 'Engineered localize content capability with RTL configuration options for Urdu readers.',
    costUSD: 12,
    costPKR: 3000,
    category: 'functional'
  },
  {
    id: 'branding',
    name: 'Corporate Identity Elements & Logo Crafting',
    description: 'Visual identity system including vector based custom business logos and selected matching palettes.',
    costUSD: 10,
    costPKR: 2500,
    category: 'design'
  }
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq_101',
    clientName: 'Sardar Ali Khan',
    clientEmail: 'khan.enterprises.pk@gmail.com',
    clientCompany: 'Khan Enterprises Peshawar',
    clientPhone: '+923001234567',
    serviceType: 'business',
    additionalFeatures: ['seo_pro', 'branding'],
    timelineRequirement: 'standard',
    estimatedCostUSD: 75,
    estimatedCostPKR: 20000,
    estimatedTimelineDays: 14,
    clientMessage: 'Assalam-o-Alaikum Taha. We want a modern multi-page corporate website displaying our wholesale marble business. We are looking for highly professional high-end execution with focus on aesthetics.',
    createdAt: '2026-05-28T09:12:00Z',
    status: 'In Discussion',
    adminNotes: 'Spoke with Mr. Khan. Provided reference premium portfolios. He likes clean charcoal accents.'
  },
  {
    id: 'inq_102',
    clientName: 'Amara Matthews',
    clientEmail: 'amara.m@techreach.co.uk',
    clientCompany: 'TechReach Labs London',
    clientPhone: '+447911123456',
    serviceType: 'landing',
    additionalFeatures: ['dark_mode'],
    timelineRequirement: 'urgent',
    estimatedCostUSD: 33,
    estimatedCostPKR: 8750,
    estimatedTimelineDays: 5,
    clientMessage: 'Hello Taha, we noticed your portfolio on Github and need an elegant single-page product showcase with high-end modern micro-interactions in 5 days. Can you commit to this schedule?',
    createdAt: '2026-05-29T14:45:00Z',
    status: 'New',
    adminNotes: 'Urgent timeline requested. Codebase needs high-fidelity layout. Reviewing bandwidth.'
  },
  {
    id: 'inq_103',
    clientName: 'Dr. Tariq Zaman',
    clientEmail: 'tariq.zaman@kohatdental.com',
    clientCompany: 'Zaman Dental Care Kohat',
    clientPhone: '+923129876543',
    serviceType: 'custom',
    additionalFeatures: ['db_int', 'multilingual'],
    timelineRequirement: 'flexible',
    estimatedCostUSD: 281,
    estimatedCostPKR: 77190,
    estimatedTimelineDays: 35,
    clientMessage: 'I would like to set up an advanced patient scheduling form and catalog for our practice in Kohat, Pakistani. We need patients to be able to toggle easily between English and Urdu options.',
    createdAt: '2026-05-30T10:30:00Z',
    status: 'Contract Sent',
    adminNotes: 'Contract template emailed. Setting up project workspace structure.'
  }
];
