import { Controller,Post,Get , Put,Delete ,Param,Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "../services/prisma.services";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { InterviewService } from "../services/interview.service";


@Controller('interview')
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}
    
    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    async createInterview(
        @Body() body: { candidateId: number; scheduledAt: string; interviewer: string } 
    ) {

        return this.interviewService.createInterview(body)
    }

    @Get('all')
    async getAllInterviews() {
        return this.interviewService.getAllInterviews()
    };
    
    
    @Get(':id')
    async getInterview(@Param('id') id: string) {
        
        return this.interviewService.getInterview(Number(id));
    }

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateInterview(
        @Param('id') id: string,    
        @Body() body: any
    ) {
        return this.interviewService.updateInterview(Number(id), body)
    }

    @Delete(':id')
    async deleteInterview(@Param('id') id: string) {
        return this.interviewService.deleteInterview(Number(id))
    }
}