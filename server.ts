import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

app.use(express.json());

// Initial seed inquiries (with Cadet mentions removed as per requirement)
const INITIAL_INQUIRIES = [
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
    clientMessage: 'Assalam-o-Alaikum Taha. We want a modern multi-page corporate website displaying our wholesale marble business. We are looking for highly professional high-standard execution with focus on aesthetics.',
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

// Helper to read leads from leads.json
function readLeads(): any[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_INQUIRIES, null, 2));
      return INITIAL_INQUIRIES;
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads file:', error);
    return INITIAL_INQUIRIES;
  }
}

// Helper to write leads to leads.json
function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads file:', error);
  }
}

// API: Get all leads
app.get('/api/inquiries', (req, res) => {
  const leads = readLeads();
  res.json(leads);
});

// API: Create a new lead
app.post('/api/inquiries', (req, res) => {
  const leads = readLeads();
  const newLead = {
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'New'
  };
  leads.unshift(newLead);
  writeLeads(leads);
  res.status(201).json(newLead);
});

// API: Update an existing lead
app.put('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const leads = readLeads();
  const index = leads.findIndex(lead => lead.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...req.body };
    writeLeads(leads);
    res.json(leads[index]);
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

// API: Delete a lead
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  let leads = readLeads();
  const initialLength = leads.length;
  leads = leads.filter(lead => lead.id !== id);
  if (leads.length < initialLength) {
    writeLeads(leads);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } else {
    res.status(404).json({ error: 'Lead not found' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
