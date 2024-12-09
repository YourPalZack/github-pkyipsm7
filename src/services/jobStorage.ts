import { Job } from '../types/Job';

export class JobStorage {
  private static readonly STORAGE_KEY = 'cannabis_jobs';

  static async saveJobs(jobs: Job[]): Promise<void> {
    try {
      const existingJobs = await this.getJobs();
      const newJobs = jobs.filter(job => 
        !existingJobs.some(existing => existing.id === job.id)
      );

      if (newJobs.length > 0) {
        const updatedJobs = [...existingJobs, ...newJobs];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedJobs));
        console.log(`Saved ${newJobs.length} new jobs`);
      }
    } catch (error) {
      console.error('Error saving jobs:', error);
      throw error;
    }
  }

  static async getJobs(): Promise<Job[]> {
    try {
      const jobsJson = localStorage.getItem(this.STORAGE_KEY);
      return jobsJson ? JSON.parse(jobsJson) : [];
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  }

  static async clearOldJobs(daysOld: number): Promise<void> {
    try {
      const jobs = await this.getJobs();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const activeJobs = jobs.filter(job => 
        new Date(job.postedAt) > cutoffDate
      );

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(activeJobs));
      console.log(`Removed ${jobs.length - activeJobs.length} old jobs`);
    } catch (error) {
      console.error('Error clearing old jobs:', error);
      throw error;
    }
  }
}