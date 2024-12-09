import axios from 'axios';
import { formatISO } from 'date-fns';
import { Job } from '../types/Job';

const API_KEY = '44a37b29bcmsh0aaf8ab3dcad31dp15e867jsnc920b41dafbb';
const API_HOST = 'jobs-api14.p.rapidapi.com';

const api = axios.create({
  baseURL: 'https://jobs-api14.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
});

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

export async function fetchCannabisJobs(): Promise<ApiJob[]> {
  try {
    const response = await api.get('/v2/list', {
      params: {
        query: 'Cannabis',
        location: 'United States',
        autoTranslateLocation: false,
        remoteOnly: false,
        employmentTypes: 'fulltime;parttime;intern;contractor',
      },
    });

    return response.data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export function transformApiJob(apiJob: ApiJob): Job {
  return {
    id: parseInt(apiJob.id),
    title: apiJob.title,
    company: apiJob.company,
    logo: `https://source.unsplash.com/random/100x100?cannabis,${apiJob.company.toLowerCase()}`,
    description: apiJob.description,
    location: apiJob.location.split(',')[0].trim(),
    state: apiJob.location.split(',')[1]?.trim() || 'US',
    type: apiJob.employmentType,
    postedAt: formatISO(new Date(apiJob.datePosted)),
    likes: 0,
    category: determineJobCategory(apiJob.title),
    requirements: extractRequirements(apiJob.description),
    salary: apiJob.salary,
  };
}

function determineJobCategory(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('grow') || titleLower.includes('cultiva')) return 'Cultivation';
  if (titleLower.includes('retail') || titleLower.includes('dispensary')) return 'Retail';
  if (titleLower.includes('process') || titleLower.includes('extract')) return 'Processing';
  if (titleLower.includes('market')) return 'Marketing';
  if (titleLower.includes('admin') || titleLower.includes('manage')) return 'Administration';
  return 'Other';
}

function extractRequirements(description: string): string[] {
  const requirements: string[] = [];
  const sentences = description.split(/[.!?]+/);
  
  for (const sentence of sentences) {
    if (
      sentence.toLowerCase().includes('require') ||
      sentence.toLowerCase().includes('must have') ||
      sentence.toLowerCase().includes('qualification')
    ) {
      const requirement = sentence.trim();
      if (requirement) requirements.push(requirement);
    }
  }

  return requirements.length > 0 ? requirements : ['Experience in cannabis industry preferred'];
}