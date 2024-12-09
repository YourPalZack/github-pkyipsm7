import { db } from '../connection';

export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  state: string;
  type: string;
  founded: string;
  employees: string;
  website: string;
  licenses?: string[];
  specialties?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export class CompanyModel {
  static async create(company: Omit<Company, 'id'>): Promise<number> {
    const [id] = await db('companies').insert(company);
    return id;
  }

  static async findById(id: number): Promise<Company | null> {
    const company = await db('companies').where({ id }).first();
    if (!company) return null;

    const licenses = await db('company_licenses')
      .where({ company_id: id })
      .pluck('license');

    const specialties = await db('company_specialties')
      .where({ company_id: id })
      .pluck('specialty');

    return { ...company, licenses, specialties };
  }

  static async findAll(): Promise<Company[]> {
    const companies = await db('companies');
    return Promise.all(
      companies.map(async (company) => {
        const licenses = await db('company_licenses')
          .where({ company_id: company.id })
          .pluck('license');

        const specialties = await db('company_specialties')
          .where({ company_id: company.id })
          .pluck('specialty');

        return { ...company, licenses, specialties };
      })
    );
  }
}