import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getTimeToHire() {
    const candidates = await this.prisma.candidate.findMany({
      where: { status: "hired" },
      select: {
        createdAt: true,
        // You can add a field like 'hiredAt' if available
      },
    });

    if (!candidates.length) return 0;

    // placeholder: assuming 'createdAt' -> applied, and 'hiredAt' exists
    const totalDays = candidates.reduce((sum, c: any) => {
      const hiredAt = (c as any).hiredAt || new Date(); // fallback
      const days =
        (new Date(hiredAt).getTime() - new Date(c.createdAt).getTime()) /
        (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0);

    return totalDays / candidates.length;
  }

  async getApplicantsPerJob() {
    const jobs = await this.prisma.job.findMany({
      include: { candidates: true },
    });

    return jobs.map((job) => ({
      jobId: job.id,
      title: job.title,
      applicantCount: job.candidates.length,
    }));
  }

  async getOfferAcceptanceRate() {
    const candidates = await this.prisma.candidate.findMany({
      select: { status: true },
    });

    if (!candidates.length) return 0;

    const offersExtended = candidates.filter(
      (c) => c.status === "offered"
    ).length;
    const offersAccepted = candidates.filter(
      (c) => c.status === "hired"
    ).length;

    return offersExtended ? (offersAccepted / offersExtended) * 100 : 0;
  }

  // Full metrics summary
  async getAllMetrics() {
    return {
      timeToHire: await this.getTimeToHire(),
      applicantsPerJob: await this.getApplicantsPerJob(),
      offerAcceptanceRate: await this.getOfferAcceptanceRate(),
    };
  }
}
