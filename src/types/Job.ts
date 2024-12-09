export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  state: string;
  type: string;
  postedAt: string;
  likes: number;
  category: string;
  requirements: string[];
  salary?: string;
}