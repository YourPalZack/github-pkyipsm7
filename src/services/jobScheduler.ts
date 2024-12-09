import cron from 'node-cron';
import { fetchCannabisJobs, transformApiJob } from './jobsApi';
import { JobStorage } from './jobStorage';

async function updateJobs() {
  try {
    console.log('Starting job update process...');
    
    // Clear jobs older than 30 days
    await JobStorage.clearOldJobs(30);

    // Fetch and transform new jobs
    const apiJobs = await fetchCannabisJobs();
    const transformedJobs = apiJobs.map(transformApiJob);

    // Save new jobs
    await JobStorage.saveJobs(transformedJobs);

    console.log('Job update process completed successfully');
  } catch (error) {
    console.error('Error in job update process:', error);
  }
}

// Schedule job updates to run every 24 hours at 2 AM
cron.schedule('0 2 * * *', updateJobs);

// Run initial update when starting the scheduler
updateJobs();