import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    try {
      const job = await this.jobsService.create(createJobDto);
      return {
        status: 'success',
        message: 'Job created successfully',
        data: job
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Failed to create job',
        error: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const jobs = await this.jobsService.findAll();
      return {
        status: 'success',
        data: jobs
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Failed to fetch jobs',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const job = await this.jobsService.findOne(+id);
      if (!job) {
        throw new HttpException({
          status: 'error',
          message: `Job with ID ${id} not found`
        }, HttpStatus.NOT_FOUND);
      }
      return {
        status: 'success',
        data: job
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Failed to fetch job',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    try {
      const updatedJob = await this.jobsService.update(+id, updateJobDto);
      if (!updatedJob) {
        throw new HttpException({
          status: 'error',
          message: `Job with ID ${id} not found`
        }, HttpStatus.NOT_FOUND);
      }
      return {
        status: 'success',
        message: 'Job updated successfully',
        data: updatedJob
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Failed to update job',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.jobsService.remove(+id);
      return {
        status: 'success',
        message: `Job with ID ${id} deleted successfully`
      };
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Failed to delete job',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}