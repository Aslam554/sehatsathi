// Mock data for SehatSathi X

export interface Village {
  id: string;
  name: string;
  district: string;
  population: number;
}

export interface MedicineStatus {
  villageId: string;
  villageName: string;
  medicine: string;
  currentStock: number;
  requiredStock: number;
  status: 'ok' | 'low' | 'critical';
  predictedShortageIn?: number; // days
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  location: string;
  status: 'available' | 'on-trip' | 'offline';
  driver: string;
  contact: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  departments: string[];
  currentQueue: number;
  avgWaitTime: number; // minutes
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibilityCriteria: string[];
  benefits: string[];
}

export interface DisasterAlert {
  id: string;
  type: 'flood' | 'heatwave' | 'storm' | 'drought';
  severity: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  healthAdvisory: string;
  timestamp: string;
}

export interface Volunteer {
  id: string;
  name: string;
  role: 'blood-donor' | 'first-aid' | 'rider' | 'general';
  village: string;
  contact: string;
  bloodGroup?: string;
  available: boolean;
}

// Mock Villages
export const villages: Village[] = [
  { id: 'v1', name: 'Rampur', district: 'Sitapur', population: 3500 },
  { id: 'v2', name: 'Khairabad', district: 'Sitapur', population: 2800 },
  { id: 'v3', name: 'Biswan', district: 'Sitapur', population: 4200 },
  { id: 'v4', name: 'Maholi', district: 'Sitapur', population: 2100 },
  { id: 'v5', name: 'Laharpur', district: 'Sitapur', population: 3900 },
];

// Mock Medicine Status
export const medicineStatus: MedicineStatus[] = [
  {
    villageId: 'v1',
    villageName: 'Rampur',
    medicine: 'Paracetamol',
    currentStock: 50,
    requiredStock: 200,
    status: 'critical',
    predictedShortageIn: 5,
  },
  {
    villageId: 'v1',
    villageName: 'Rampur',
    medicine: 'Amoxicillin',
    currentStock: 180,
    requiredStock: 150,
    status: 'ok',
  },
  {
    villageId: 'v2',
    villageName: 'Khairabad',
    medicine: 'Paracetamol',
    currentStock: 120,
    requiredStock: 180,
    status: 'low',
    predictedShortageIn: 12,
  },
  {
    villageId: 'v2',
    villageName: 'Khairabad',
    medicine: 'ORS',
    currentStock: 40,
    requiredStock: 100,
    status: 'low',
  },
  {
    villageId: 'v3',
    villageName: 'Biswan',
    medicine: 'Paracetamol',
    currentStock: 250,
    requiredStock: 200,
    status: 'ok',
  },
  {
    villageId: 'v3',
    villageName: 'Biswan',
    medicine: 'Azithromycin',
    currentStock: 30,
    requiredStock: 80,
    status: 'critical',
    predictedShortageIn: 3,
  },
];

// Mock Ambulances
export const ambulances: Ambulance[] = [
  {
    id: 'a1',
    vehicleNumber: 'UP 80 AB 1234',
    location: 'Rampur',
    status: 'available',
    driver: 'Rajesh Kumar',
    contact: '9876543210',
  },
  {
    id: 'a2',
    vehicleNumber: 'UP 80 CD 5678',
    location: 'Khairabad',
    status: 'on-trip',
    driver: 'Suresh Yadav',
    contact: '9876543211',
  },
  {
    id: 'a3',
    vehicleNumber: 'UP 80 EF 9012',
    location: 'Biswan',
    status: 'available',
    driver: 'Mohan Singh',
    contact: '9876543212',
  },
  {
    id: 'a4',
    vehicleNumber: 'UP 80 GH 3456',
    location: 'Maholi',
    status: 'offline',
    driver: 'Ramesh Verma',
    contact: '9876543213',
  },
];

// Mock Hospitals
export const hospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'District Hospital Sitapur',
    location: 'Sitapur',
    departments: ['OPD', 'Emergency', 'Maternity', 'Pediatrics'],
    currentQueue: 23,
    avgWaitTime: 45,
  },
  {
    id: 'h2',
    name: 'Community Health Center Rampur',
    location: 'Rampur',
    departments: ['OPD', 'Emergency', 'Pharmacy'],
    currentQueue: 12,
    avgWaitTime: 25,
  },
  {
    id: 'h3',
    name: 'Primary Health Center Khairabad',
    location: 'Khairabad',
    departments: ['OPD', 'Basic Emergency'],
    currentQueue: 8,
    avgWaitTime: 15,
  },
];

// Mock Schemes
export const schemes: Scheme[] = [
  {
    id: 's1',
    name: 'Ayushman Bharat',
    description: 'Free health insurance coverage up to ₹5 lakhs per family per year',
    eligibilityCriteria: ['Below Poverty Line', 'Rural household', 'Annual income < ₹3 lakhs'],
    benefits: ['Free hospitalization', 'Free medicines', 'Free diagnostics'],
  },
  {
    id: 's2',
    name: 'PM Jan Aushadhi',
    description: 'Access to affordable generic medicines',
    eligibilityCriteria: ['All citizens'],
    benefits: ['Medicines at 50-90% lower cost', 'Quality assured generics'],
  },
  {
    id: 's3',
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    description: 'Accident insurance scheme',
    eligibilityCriteria: ['Age 18-70 years', 'Savings bank account'],
    benefits: ['₹2 lakh accident cover', 'Annual premium ₹12'],
  },
  {
    id: 's4',
    name: 'National Health Mission (NHM)',
    description: 'Free maternal and child health services',
    eligibilityCriteria: ['Pregnant women', 'Children under 5'],
    benefits: ['Free delivery', 'Free immunization', 'Nutritional support'],
  },
];

// Mock Disaster Alerts
export const disasterAlerts: DisasterAlert[] = [
  {
    id: 'd1',
    type: 'flood',
    severity: 'high',
    region: 'Rampur, Khairabad',
    healthAdvisory: 'Risk of waterborne diseases. Boil water before drinking. Watch for skin infections.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'd2',
    type: 'heatwave',
    severity: 'medium',
    region: 'All districts',
    healthAdvisory: 'Stay hydrated. Avoid sun exposure 11 AM - 4 PM. Risk of heatstroke and dehydration.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'd3',
    type: 'storm',
    severity: 'low',
    region: 'Biswan',
    healthAdvisory: 'Stay indoors. Risk of injury from falling debris. Keep first-aid ready.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Volunteers
export const volunteers: Volunteer[] = [
  {
    id: 'vol1',
    name: 'Ramesh Kumar',
    role: 'blood-donor',
    village: 'Rampur',
    contact: '9876543220',
    bloodGroup: 'O+',
    available: true,
  },
  {
    id: 'vol2',
    name: 'Sunita Devi',
    role: 'first-aid',
    village: 'Khairabad',
    contact: '9876543221',
    available: true,
  },
  {
    id: 'vol3',
    name: 'Anil Singh',
    role: 'rider',
    village: 'Biswan',
    contact: '9876543222',
    available: true,
  },
  {
    id: 'vol4',
    name: 'Priya Sharma',
    role: 'blood-donor',
    village: 'Maholi',
    contact: '9876543223',
    bloodGroup: 'A+',
    available: false,
  },
  {
    id: 'vol5',
    name: 'Vijay Yadav',
    role: 'first-aid',
    village: 'Laharpur',
    contact: '9876543224',
    available: true,
  },
  {
    id: 'vol6',
    name: 'Kavita Verma',
    role: 'blood-donor',
    village: 'Rampur',
    contact: '9876543225',
    bloodGroup: 'B+',
    available: true,
  },
];
