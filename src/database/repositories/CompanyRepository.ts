import { db } from '../connection';
import { Company } from '../../types/Company';

export class CompanyRepository {
  static async create(company: Omit<Company, 'id'>): Promise<number> {
    const [id] = await db('companies').insert({
      name: company.name,
      logo: company.logo,
      description: company.description,
      location: company.location,
      type: company.type,
      founded: company.founded,
      employees: company.employees,
      website: company.website,
    });

    // Insert licenses
    await db('company_licenses').insert(
      company.licenses.map(license => ({
        company_id: id,
        license,
      }))
    );

    // Insert specialties
    await db('company_specialties').insert(
      company.specialties.map(specialty => ({
        company_id: id,
        specialty,
      }))
    );

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

    return {
      ...company,
      licenses,
      specialties,
    };
  }

  static async findAll(): Promise<Company[]> {
    const companies = await db('companies');
    
    const companiesWithDetails = await Promise.all(
      companies.map(async (company) => {
        const licenses = await db('company_licenses')
          .where({ company_id: company.id })
          .pluck('license');

        const specialties = await db('company_specialties')
          .where({ company_id: company.id })
          .pluck('specialty');

        return {
          ...company,
          licenses,
          specialties,
        };
      })
    );

    return companiesWithDetails;
  }

  static async update(id: number, company: Partial<Company>): Promise<void> {
    await db.transaction(async (trx) => {
      if (company.licenses) {
        await trx('company_licenses').where({ company_id: id }).delete();
        await trx('company_licenses').insert(
          company.licenses.map(license => ({
            company_id: id,
            license,
          }))
        );
      }

      if (company.specialties) {
        await trx('company_specialties').where({ company_id: id }).delete();
        await trx('company_specialties').insert(
          company.specialties.map(specialty => ({
            company_id: id,
            specialty,
          }))
        );
      }

      delete company.licenses;
      delete company.specialties;

      if (Object.keys(company).length > 0) {
        await trx('companies').where({ id }).update(company);
      }
    });
  }

  static async delete(id: number): Promise<void> {
    await db('companies').where({ id }).delete();
  }
}