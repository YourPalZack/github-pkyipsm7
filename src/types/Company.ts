export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  type: string;
  founded: string;
  employees: string;
  website: string;
  licenses: string[];
  specialties: string[];
  created_at?: string;
  updated_at?: string;
}