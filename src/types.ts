/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceTierType = 'landing' | 'business' | 'ecommerce' | 'custom';

export interface ServicePackage {
  id: ServiceTierType;
  title: string;
  shortDesc: string;
  basePriceUSD: number;
  basePricePKR: number;
  estimatedDays: number;
  features: string[];
}

export interface QuoteFeature {
  id: string;
  name: string;
  description: string;
  costUSD: number;
  costPKR: number;
  category: 'design' | 'functional' | 'marketing';
}

export type LeadStatus = 'New' | 'In Discussion' | 'Contract Sent' | 'In Progress' | 'Completed' | 'Archived';

export interface ClientInquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientPhone?: string;
  serviceType: ServiceTierType;
  additionalFeatures: string[];
  timelineRequirement: 'urgent' | 'standard' | 'flexible';
  estimatedCostUSD: number;
  estimatedCostPKR: number;
  estimatedTimelineDays: number;
  clientMessage: string;
  submissionType?: 'lead' | 'message';
  isPriority?: boolean;
  createdAt: string;
  status: LeadStatus;
  adminNotes?: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  inDiscussionLeads: number;
  activeProjects: number;
  totalPipelineUSD: number;
  totalPipelinePKR: number;
}
