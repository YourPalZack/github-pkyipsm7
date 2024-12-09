import { Job } from '../../types/Job';
import { StorageKeys } from '../../config/storage';

export class JobStorage {
  static async saveJobs(jobs: Job[]): Promise<void> {
    try {
      const existingJobs = await this.getJobs();
      const newJobs = this.filterNewJobs(existingJobs, jobs);

      if (newJobs.length > 0) {
        const updatedJobs = [...existingJobs, ...newJobs];
        localStorage.setItem(StorageKeys.JOBS, JSON.stringify(updatedJobs));
        console.log(`Saved ${newJobs.length} new jobs`);
      }
    } catch (error) {
      console.error('Error saving jobs:', error);
      throw error;
    }
  }

  static async getJobs(): Promise<Job[]> {
    try {
      const jobsJson = localStorage.getItem(StorageKeys.JOBS);
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

      const activeJobs = this.filterActiveJobs(jobs, cutoffDate);

      localStorage.setItem(StorageKeys.JOBS, JSON.stringify(activeJobs));
      console.log(`Removed ${jobs.length - activeJobs.length} old jobs`);
    } catch (error) {
      console.error('Error clearing old jobs:', error);
      throw error;
    }
  }

  private static filterNewJobs(existingJobs: Job[], newJobs: Job[]): Job[] {
    return newJobs.filter(job => 
      !existingJobs.some(existing => existing.id === job.id)
    );
  }

  private static filterActiveJobs(jobs: Job[], cutoffDate: Date): Job[] {
    return jobs.filter(job => new Date(job.postedAt) > cutoffDate);
  }
}