import { Controller , Post, Body ,Get , Put, Delete ,Param, UseGuards} from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JobService } from "../services/job.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
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

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateJob(@Param('id') id: string, @Body() body: any) {
        return this.jobService.updateJob(Number(id), body);
    }

    @Delete(':id')
    async deleteJob(@Param('id') id: string) {
        return this.jobService.deleteJob(Number(id));
    }

}