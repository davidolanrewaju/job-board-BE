import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Return all jobs', type: [Job] })
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by id' })
  @ApiResponse({ status: 200, description: 'Return a job', type: Job })
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been created',
    type: Job,
  })
  create(@Body() job: CreateJobDto): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job' })
  @ApiResponse({
    status: 200,
    description: 'The job has been updated',
    type: Job,
  })
  update(
    @Param('id') id: string,
    @Body() job: Partial<CreateJobDto>,
  ): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  @ApiResponse({ status: 200, description: 'The job has been deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.jobsService.remove(id);
  }
}
