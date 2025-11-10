
export type UserRole = 'customer' | 'worker';

export type Language = 'en' | 'hi' | 'bn';

export interface Address {
  houseNumber: string;
  area: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
}

export type WorkerProfile = {
  id: string;
  name: string;
  mobileNumber: string;
  experience: string;
  location: string; // This will be a formatted string from Address
  address: Address;
  primarySkills: string[];
  secondarySkills: string;
  desiredDailyWage: number;
  language: Language;
  avatarUrl: string;
  rating?: number;
  currentCityExperience?: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string; // This will be a formatted string from Address
  address: Address;
  wage: number;
  skills: string[];
  customerId: string;
  status: 'open' | 'active' | 'completed' | 'cancelled';
  workerId?: string;
  startDate?: string;
};

export type CustomerAddress = {
  id: string;
  address: string; // This will be a formatted string from Address
  addressDetails: Address;
  isDefault?: boolean;
};

