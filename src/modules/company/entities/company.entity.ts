import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Job } from '../../../modules/jobs/entities/job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
