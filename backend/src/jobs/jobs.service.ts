import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity'; // Fix the typo from 'entites' to 'entities'
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const job = this.jobRepository.create(createJobDto);
      return await this.jobRepository.save(job);
    } catch (error) {
      throw new BadRequestException('Failed to create job: ' + error.message);
    }
  }

  async findAll(): Promise<Job[]> {
    try {
      return await this.jobRepository.find({
        order: {
          createdAt: 'DESC' // Most recent jobs first
        }
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch jobs: ' + error.message);
    }
  }

  async findOne(id: number): Promise<Job> {
    try {
      const job = await this.jobRepository.findOneBy({ id });
      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }
      return job;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch job: ' + error.message);
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      const job = await this.findOne(id); // This will throw NotFoundException if job doesn't exist
      
      // Merge the updated fields with existing job
      const updatedJob = this.jobRepository.merge(job, updateJobDto);
      return await this.jobRepository.save(updatedJob);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update job: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const job = await this.findOne(id); // This will throw NotFoundException if job doesn't exist
      await this.jobRepository.remove(job);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete job: ' + error.message);
    }
  }
}