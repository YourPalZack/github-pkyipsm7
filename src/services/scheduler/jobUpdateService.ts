import { fetchCannabisJobs } from '../api/jobsApi';
import { transformApiJob } from '../../utils/jobTransformer';
import { JobStorage } from '../storage/jobStorage';

export class JobUpdateService {
  async updateJobs(): Promise<void> {
    try {
      console.log('Starting job update process...');
      
      await JobStorage.clearOldJobs(30);
      const apiJobs = await fetchCannabisJobs();
      const transformedJobs = apiJobs.map(transformApiJob);
      await JobStorage.saveJobs(transformedJobs);

      console.log('Job update process completed successfully');
    } catch (error) {
      console.error('Error in job update process:', error);
    }
  }
}