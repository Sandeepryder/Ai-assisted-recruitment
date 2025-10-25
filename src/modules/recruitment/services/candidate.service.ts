import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.services';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async createCandidate(data: any) {
    const jobId = Number(data.jobId);
    if (Number.isNaN(jobId)) {
      throw new BadRequestException('Invalid jobId');
    }

    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new BadRequestException(`Job with id ${jobId} not found. Create job first.`);
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
}
