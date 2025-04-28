import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  })
  jobType: string;

  @Column('int')
  salaryMin: number;

  @Column('int')
  salaryMax: number;

  @Column('text')
  jobDescription: string;

  @Column('text', { nullable: true })
  requirements: string;

  @Column('text', { nullable: true })
  responsibilities: string;

  @Column('timestamp')
  applicationDeadline: Date;

  @Column({
    type: 'enum',
    enum: ['draft', 'published'],
    default: 'draft'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}