import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) {}   
    async createInterview(data: any) {
        const result = await this.prisma.interview.create({
            data: {
                candidateId: data.candidateId,
                scheduledAt: new Date(data.scheduledAt),
                interviewer: data.interviewer,
                status: 'scheduled'
            },
        });
        return { success: true, data: result };
    }   
    async getAllInterviews() {
        return this.prisma.interview.findMany({
            include: { candidate: true },
        });
    }
    async getInterview(id: number) {
        const interview = await this.prisma.interview.findUnique({
            where: { id },

            include: { candidate: true },
        });
        return interview;
    }   
    async updateInterview(id: number, data: any) {
        return this.prisma.interview.update({
            where: { id },  
            data: {
                scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
                status: data.mode,
                interviewer: data.interviewer,
            },
        });
    }
    async deleteInterview(id: number) {
        return this.prisma.interview.delete({ where: { id } });
    }
}
