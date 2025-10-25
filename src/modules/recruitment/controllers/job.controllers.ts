import { Controller , Post, Body ,Get , Put, Delete ,Param} from "@nestjs/common";
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

    @Get(':id')
    async getJob(@Param('id') id: string) {
        return this.jobService.getJob(Number(id));
    }

    @Put(':id')
    async updateJob(@Param('id') id: string, @Body() body: any) {
        return this.jobService.updateJob(Number(id), body);
    }

    @Delete(':id')
    async deleteJob(@Param('id') id: string) {
        return this.jobService.deleteJob(Number(id));
    }

}