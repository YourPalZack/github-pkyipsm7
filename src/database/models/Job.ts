import { db } from '../connection';

export interface Job {
  id: number;
  company_id: number;
  title: string;
  description: string;
  location: string;
  state: string;
  type: string;
  category: string;
  salary?: string;
  likes: number;
  posted_at: Date;
  external_id?: string;
  requirements?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export class JobModel {
  static async create(job: Omit<Job, 'id'>): Promise<number> {
    const [id] = await db('jobs').insert(job);
    return id;
  }

  static async findById(id: number): Promise<Job | null> {
    const job = await db('jobs').where({ id }).first();
    if (!job) return null;

    const requirements = await db('job_requirements')
      .where({ job_id: id })
      .orderBy('order')
      .pluck('requirement');

    return { ...job, requirements };
  }

  static async findAll(): Promise<Job[]> {
    const jobs = await db('jobs');
    return Promise.all(
      jobs.map(async (job) => {
        const requirements = await db('job_requirements')
          .where({ job_id: job.id })
          .orderBy('order')
          .pluck('requirement');

        return { ...job, requirements };
      })
    );
  }

  static async incrementLikes(id: number): Promise<void> {
    await db('jobs').where({ id }).increment('likes', 1);
  }
}