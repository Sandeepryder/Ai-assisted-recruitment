import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) {}
    async createJob(data: any) {
        const result = await this.prisma.job.create({
            data: {
                title: data.title,
                description: data.description,
                scoringKeywords: data.scoringKeywords,  
            },
        });
        return { success: true, data: result };
    }

    async getAllJobs() {
    return this.prisma.job.findMany({
      include: { candidates: true },
    });
  }
}