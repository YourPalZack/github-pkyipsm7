import { db } from '../connection';
import { Job } from '../../types/Job';

export class JobRepository {
  static async create(job: Omit<Job, 'id'>): Promise<number> {
    const [id] = await db('jobs').insert({
      company_id: job.company_id,
      title: job.title,
      description: job.description,
      location: job.location,
      state: job.state,
      type: job.type,
      posted_at: job.postedAt,
      category: job.category,
      salary: job.salary,
    });

    await db('job_requirements').insert(
      job.requirements.map(requirement => ({
        job_id: id,
        requirement,
      }))
    );

    return id;
  }

  static async findById(id: number): Promise<Job | null> {
    const job = await db('jobs')
      .join('companies', 'jobs.company_id', 'companies.id')
      .where('jobs.id', id)
      .select('jobs.*', 'companies.name as company', 'companies.logo')
      .first();

    if (!job) return null;

    const requirements = await db('job_requirements')
      .where({ job_id: id })
      .pluck('requirement');

    return {
      ...job,
      requirements,
    };
  }

  static async findAll(filters?: {
    category?: string;
    state?: string;
    isActive?: boolean;
  }): Promise<Job[]> {
    let query = db('jobs')
      .join('companies', 'jobs.company_id', 'companies.id')
      .select('jobs.*', 'companies.name as company', 'companies.logo');

    if (filters?.category) {
      query = query.where('jobs.category', filters.category);
    }

    if (filters?.state) {
      query = query.where('jobs.state', filters.state);
    }

    if (filters?.isActive !== undefined) {
      query = query.where('jobs.is_active', filters.isActive);
    }

    const jobs = await query;

    const jobsWithRequirements = await Promise.all(
      jobs.map(async (job) => {
        const requirements = await db('job_requirements')
          .where({ job_id: job.id })
          .pluck('requirement');

        return {
          ...job,
          requirements,
        };
      })
    );

    return jobsWithRequirements;
  }

  static async update(id: number, job: Partial<Job>): Promise<void> {
    await db.transaction(async (trx) => {
      if (job.requirements) {
        await trx('job_requirements').where({ job_id: id }).delete();
        await trx('job_requirements').insert(
          job.requirements.map(requirement => ({
            job_id: id,
            requirement,
          }))
        );
      }

      delete job.requirements;

      if (Object.keys(job).length > 0) {
        await trx('jobs').where({ id }).update(job);
      }
    });
  }

  static async delete(id: number): Promise<void> {
    await db('jobs').where({ id }).delete();
  }

  static async incrementLikes(id: number): Promise<void> {
    await db('jobs').where({ id }).increment('likes', 1);
  }
}