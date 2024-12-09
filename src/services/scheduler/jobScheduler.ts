import cron from 'node-cron';
import { JobUpdateService } from './jobUpdateService';

class JobScheduler {
  private updateService: JobUpdateService;

  constructor() {
    this.updateService = new JobUpdateService();
  }

  start(): void {
    // Schedule job updates to run every 24 hours at 2 AM
    cron.schedule('0 2 * * *', () => this.updateService.updateJobs());

    // Run initial update
    this.updateService.updateJobs();
  }
}

// Start the scheduler
const scheduler = new JobScheduler();
scheduler.start();