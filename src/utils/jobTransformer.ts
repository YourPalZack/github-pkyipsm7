import { formatISO } from 'date-fns';
import { ApiJob } from '../types/ApiJob';
import { Job } from '../types/Job';
import { determineJobCategory } from './categoryUtils';
import { extractRequirements } from './requirementUtils';
import { generateCompanyLogo } from './logoUtils';

export function transformApiJob(apiJob: ApiJob): Job {
  return {
    id: parseInt(apiJob.id),
    title: apiJob.title,
    company: apiJob.company,
    logo: generateCompanyLogo(apiJob.company),
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