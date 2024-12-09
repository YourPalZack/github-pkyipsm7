import { useState, useEffect } from 'react';
import { Job } from '../types/Job';
import { JobStorage } from '../services/jobStorage';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const storedJobs = await JobStorage.getJobs();
        setJobs(storedJobs);
      } catch (err) {
        setError('Failed to load jobs');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return { jobs, loading, error };
}