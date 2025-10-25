import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async createCandidate(data: any) {
    const jobId = Number(data.jobId);
    if (Number.isNaN(jobId)) {
      throw new BadRequestException("Invalid jobId");
    }

    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new BadRequestException(
        `Job with id ${jobId} not found. Create job first.`
      );
    }

    const result = await this.prisma.candidate.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        job: { connect: { id: jobId } },
      },
    });

    return { success: true, data: result };
  }

  async getAllCandidates() {
    return this.prisma.candidate.findMany({
      include: { job: true, parsedResume: true },
    });
  }

  async getCandidate(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: { job: true, parsedResume: true },
    });
    if (!candidate)
      throw new NotFoundException(`Candidate with id ${id} not found`);
    return candidate;
  }

  async updateCandidate(id: number, data: any) {
    return this.prisma.candidate.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        status: data.status,
      },
    });
  }

  // Delete Candidate
  async deleteCandidate(id: number) {
    return this.prisma.candidate.delete({ where: { id } });
  }
}
