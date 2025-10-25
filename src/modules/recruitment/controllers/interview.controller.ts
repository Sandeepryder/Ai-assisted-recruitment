import { Controller,Post,Get , Put,Delete ,Param,Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "../services/prisma.services";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";


@Controller('interview')
export class InterviewController {
    constructor(private readonly prismaService: PrismaService) {}
    
    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    async createInterview(
        @Body() body: { candidateId: number; scheduledAt: string; interviewer: string } 
    ) {
        const result = await this.prismaService.interview.create({
            data: {
                candidateId: body.candidateId,
                scheduledAt: new Date(body.scheduledAt),
                interviewer: body.interviewer,
                status: 'scheduled'
            },
        });
        return { success: true, data: result };
    }
    @Get('all')
    async getAllInterviews() {
        return this.prismaService.interview.findMany({
            include: { candidate: true },
        });
    }
    @Get(':id')
    async getInterview(@Param('id') id: string) {
        const interview = await this.prismaService.interview.findUnique({
            where: { id: Number(id) },

            include: { candidate: true },
        });
        return interview;
    }

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateInterview(
        @Param('id') id: string,    
        @Body() body: { scheduledAt?: string; status?: string; interviewer?: string }
    ) {
        return this.prismaService.interview.update({    
            where: { id: Number(id) },  
            data: {
                scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
                status: body.status,
                interviewer: body.interviewer,
            },
        });
    }
    @Delete(':id')
    async deleteInterview(@Param('id') id: string) {
        return this.prismaService.interview.delete({ where: { id: Number(id) } });
    }
}