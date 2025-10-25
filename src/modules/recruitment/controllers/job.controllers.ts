import { Controller , Post, Body ,Get } from "@nestjs/common";
import { JobService } from "../services/job.service";

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) {}
    @Post('create')
    async createJob(
        @Body() body: { title: string; description: string; scoringKeywords?: string[] }
    ) {
        return this.jobService.createJob(body);
    }

    @Get('all')
    async getAllJobs() {
        return this.jobService.getAllJobs();
    }

}