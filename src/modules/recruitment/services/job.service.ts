import { Injectable, NotFoundException } from "@nestjs/common";
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

  async getJob(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { candidates: true },
    });
    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return job;
  }

  async updateJob(id: number, data: any) {
    return this.prisma.job.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        scoringKeywords: data.scoringKeywords || [], // default empty array
      },
    });
  }

  // Delete job
  async deleteJob(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
