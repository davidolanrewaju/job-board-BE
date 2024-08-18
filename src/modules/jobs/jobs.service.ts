import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { Company } from '../company/entities/company.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['company'] });
  }

  async findOne(id: string): Promise<Job> {
    return this.jobRepository.findOne({
      where: { id },
      relations: ['company'],
    });
  }

  async create(jobData: CreateJobDto): Promise<Job> {
    const { company, ...jobDetails } = jobData;

    let companyEntity: Company;
    companyEntity = await this.companyRepository.findOne({
      where: { name: company.name },
    });

    if (!companyEntity) {
      companyEntity = this.companyRepository.create(company);
      await this.companyRepository.save(companyEntity);
    }

    const job = this.jobRepository.create({
      ...jobDetails,
      company: companyEntity,
    });

    return this.jobRepository.save(job);
  }

  async update(id: string, jobData: Partial<CreateJobDto>): Promise<Job> {
    await this.jobRepository.update(id, jobData);
    return this.jobRepository.findOne({
      where: { id },
      relations: ['company'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
