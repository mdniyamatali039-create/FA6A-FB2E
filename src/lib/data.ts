
import type { WorkerProfile, Job, CustomerAddress } from './types';

export const primarySkills = [
  'Painter / Polisher',
  'Tile Fitter / Marble Worker',
  'Plaster Mason',
  'Raj Mistri',
  'Shuttering Mistri',
  'Helper / Labour',
  'Chipper / Finishing Labour',
  'Putty & POP Worker',
  'Carpenter',
  'Plumber (Finishing Work)',
  'Electrician (Finishing Work)',
  'Cleaner / Site Finishing Helper',
  'Waterproofing / Sealant Expert',
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry"
];


export const mockWorkers: WorkerProfile[] = [
  {
    id: 'w1',
    name: 'Ramesh Kumar',
    mobileNumber: '+919876543210',
    experience: '5+ years',
    currentCityExperience: '3-5 years',
    location: 'Sector 18, Noida',
    address: {
      houseNumber: 'A-123',
      area: 'Sector 18',
      city: 'Noida',
      pincode: '201301',
      state: 'Uttar Pradesh'
    },
    primarySkills: ['Plaster Mason'],
    secondarySkills: 'Tiling, waterproofing',
    desiredDailyWage: 800,
    language: 'hi',
    avatarUrl: 'https://picsum.photos/seed/ramesh/200/200',
    rating: 4.5,
  },
  {
    id: 'w2',
    name: 'Sita Devi',
    mobileNumber: '+919876543211',
    experience: '5+ years',
    currentCityExperience: '5+ years',
    location: 'Andheri West, Mumbai',
    address: {
      houseNumber: 'B-45',
      area: 'Andheri West',
      city: 'Mumbai',
      pincode: '400058',
      state: 'Maharashtra'
    },
    primarySkills: ['Painter / Polisher'],
    secondarySkills: 'Furniture polishing, minor repairs',
    desiredDailyWage: 900,
    language: 'en',
    avatarUrl: 'https://picsum.photos/seed/sita/200/200',
    rating: 4.8,
  },
  {
    id: 'w3',
    name: 'Priya Sharma',
    mobileNumber: '+919876543212',
    experience: '5+ years',
    currentCityExperience: '1-3 years',
    location: 'Hauz Khas, New Delhi',
    address: {
      houseNumber: 'C-78',
      area: 'Hauz Khas',
      city: 'New Delhi',
      pincode: '110016',
      state: 'Delhi'
    },
    primarySkills: ['Plumber (Finishing Work)'],
    secondarySkills: 'Appliance installation',
    desiredDailyWage: 700,
    language: 'en',
    avatarUrl: 'https://picsum.photos/seed/priya/200/200',
    rating: 4.9,
  },
  {
    id: 'w4',
    name: 'Bikash Das',
    mobileNumber: '+919876543213',
    experience: '5+ years',
    currentCityExperience: '5+ years',
    location: 'Salt Lake, Kolkata',
    address: {
      houseNumber: 'D-9',
      area: 'Salt Lake',
      city: 'Kolkata',
      pincode: '700091',
      state: 'West Bengal'
    },
    primarySkills: ['Painter / Polisher'],
    secondarySkills: 'Wall putty, design painting',
    desiredDailyWage: 850,
    language: 'bn',
    avatarUrl: 'https://picsum.photos/seed/w4/200/200',
    rating: 4.2
  },
  {
    id: 'w5',
    name: 'Vijay Verma',
    mobileNumber: '+919876543214',
    experience: '1-3 years',
    currentCityExperience: '<1 year',
    location: 'Marine Drive, Mumbai',
    address: {
      houseNumber: 'Flat 101',
      area: 'Marine Drive',
      city: 'Mumbai',
      pincode: '400020',
      state: 'Maharashtra'
    },
    primarySkills: ['Helper / Labour'],
    secondarySkills: 'Site cleaning, material handling',
    desiredDailyWage: 500,
    language: 'hi',
    avatarUrl: 'https://picsum.photos/seed/w5/200/200',
    rating: 4.0
  },
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'House Renovation Work',
    description: 'Need skilled labour for a full house renovation. Includes masonry, plumbing, and electrical work. Project duration is approximately 2 months.',
    location: 'Connaught Place, New Delhi',
    address: {
      houseNumber: '7',
      area: 'Jantar Mantar Rd, Connaught Place',
      city: 'New Delhi',
      pincode: '110001',
      state: 'Delhi'
    },
    wage: 1000,
    skills: ['Plaster Mason', 'Plumber (Finishing Work)', 'Electrician (Finishing Work)'],
    customerId: 'c1',
    status: 'open',
  },
  {
    id: 'j2',
    title: 'Apartment Painting',
    description: 'Looking for an experienced painter to paint a 2BHK apartment. All materials will be provided. Work needs to be completed within a week.',
    location: 'Park Street area, Kolkata',
    address: {
      houseNumber: '15',
      area: 'Park Street, Park Street area',
      city: 'Kolkata',
      pincode: '700016',
      state: 'West Bengal'
    },
    wage: 900,
    skills: ['Painter / Polisher'],
    customerId: 'c2',
    status: 'open',
  },
  {
    id: 'j3',
    title: 'Office Furniture Assembly',
    description: 'Need a carpenter to assemble new office furniture. Should be quick and efficient.',
    location: 'Bandra Kurla Complex, Mumbai',
    address: {
      houseNumber: 'Plot 23',
      area: 'Bandra Kurla Complex, Bandra East',
      city: 'Mumbai',
      pincode: '400051',
      state: 'Maharashtra'
    },
    wage: 950,
    skills: ['Carpenter'],
    customerId: 'c1',
    status: 'active',
    workerId: 'w3',
    startDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
  },
  {
    id: 'j4',
    title: 'Site cleanup',
    description: 'Requires a team of 5 general laborers for a construction site cleanup project. The work will involve debris removal and site organization.',
    location: 'Karol Bagh, New Delhi',
    address: {
      houseNumber: '10',
      area: 'Karol Bagh',
      city: 'New Delhi',
      pincode: '110005',
      state: 'Delhi'
    },
    wage: 600,
    skills: ['Helper / Labour'],
    customerId: 'c3',
    status: 'completed',
    workerId: 'w5',
  },
  {
    id: 'j5',
    title: 'Urgent Plumbing Fix',
    description: 'Leaky pipe under the kitchen sink. Need an urgent fix.',
    location: 'Hauz Khas, New Delhi',
    address: {
      houseNumber: 'C-78',
      area: 'Hauz Khas',
      city: 'New Delhi',
      pincode: '110016',
      state: 'Delhi'
    },
    wage: 750,
    skills: ['Plumber (Finishing Work)'],
    customerId: 'c1',
    status: 'active',
    workerId: 'w1',
    startDate: new Date().toISOString(),
  },
  {
    id: 'j6',
    title: 'Garden Landscaping',
    description: 'Landscaping for a backyard garden, including planting and creating a walkway.',
    location: 'DLF Phase 2, Gurugram',
    address: {
      houseNumber: '1',
      area: 'Cyber City, DLF Phase 2',
      city: 'Gurugram',
      pincode: '122002',
      state: 'Haryana'
    },
    wage: 800,
    skills: ['Helper / Labour'],
    customerId: 'c2',
    status: 'cancelled',
  },
];

export const mockCustomerAddresses: CustomerAddress[] = [
  { 
    id: 'addr1', 
    address: '123, Business Rd, Connaught Place, New Delhi - 110001, Delhi, India',
    addressDetails: {
      houseNumber: '123',
      area: 'Business Rd, Connaught Place',
      city: 'New Delhi',
      pincode: '110001',
      state: 'Delhi',
      landmark: 'Near Central Park'
    },
    isDefault: true
  },
  { 
    id: 'addr2', 
    address: '456, Home Ave, Sector 29, Gurugram - 122022, Haryana, India',
    addressDetails: {
      houseNumber: '456',
      area: 'Home Ave, Sector 29',
      city: 'Gurugram',
      pincode: '122022',
      state: 'Haryana'
    }
  },
];
