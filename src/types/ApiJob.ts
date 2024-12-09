export interface ApiJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  employmentType: string;
  datePosted: string;
  salary?: string;
}