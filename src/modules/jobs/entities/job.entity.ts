import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from '../../../modules/company/entities/company.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  salary: string;

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;
}
