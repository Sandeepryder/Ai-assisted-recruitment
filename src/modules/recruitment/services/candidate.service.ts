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

  async updateStatusBasedOnScore(candidateId: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    // Decide status based on finalScore
    let status = "";
    if (candidate.score !== null) {
      status = candidate.score >= 0.6 ? "shortlisted" : "rejected";
    } else {
      status = "pending"; // agar score nahi hai
    }

    // Update candidate status
    return this.prisma.candidate.update({
      where: { id: candidateId },
      data: { status },
    });
  }

  // Delete Candidate
  async deleteCandidate(id: number) {
    return this.prisma.candidate.delete({ where: { id } });
  }

  async applyForJob(candidateId: number, jobId: number) {
  // Convert to number safely
  const candidateIdNum = Number(candidateId);
  const jobIdNum = Number(jobId);

  if (isNaN(candidateIdNum) || isNaN(jobIdNum)) {
    throw new Error("Invalid candidateId or jobId");
  }

  // Candidate exist check
  const candidate = await this.prisma.candidate.findUnique({
    where: { id: candidateIdNum },
  });
  if (!candidate) throw new Error("Candidate not found");

  // Job exist check
  const job = await this.prisma.job.findUnique({
    where: { id: jobIdNum },
  });
  if (!job) throw new Error("Job not found");

  // Update candidate
  const updatedCandidate = await this.prisma.candidate.update({
    where: { id: candidateIdNum },
    data: { jobId: jobIdNum, status: "applied" },
  });

  return { success: true, data: updatedCandidate };
}


  // async applyForJob(candidateId: number, jobId: number) {
  //   // Candidate exist check
  //   const candidate = await this.prisma.candidate.findUnique({
  //     where: { id: candidateId },
  //   });
  //   if (!candidate) throw new Error("Candidate not found");

  //   // Job exist check
  //   const job = await this.prisma.job.findUnique({ where: { id: jobId } });
  //   if (!job) throw new Error("Job not found");

  //   // Candidate update: assign jobId + status
  //   const updatedCandidate = await this.prisma.candidate.update({
  //     where: { id: candidateId },
  //     data: { jobId, status: "applied" },
  //   });

  //   return { success: true, data: updatedCandidate };
  // }
}
