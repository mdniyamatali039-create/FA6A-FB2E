export type UserRole = 'customer' | 'worker';

export type Language = 'en' | 'hi' | 'bn';

export type WorkerProfile = {
  id: string;
  name: string;
  mobileNumber: string;
  experience: string;
  location: string;
  primarySkills: string[];
  secondarySkills: string;
  desiredDailyWage: number;
  language: Language;
  avatarUrl: string;
  rating?: number;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  wage: number;
  skills: string[];
  customerId: string;
  status: 'open' | 'active' | 'completed';
};
