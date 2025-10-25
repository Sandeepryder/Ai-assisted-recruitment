import { PrismaService } from "./prisma.services";
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    getTimeToHire(): Promise<number>;
    getApplicantsPerJob(): Promise<{
        jobId: number;
        title: string;
        applicantCount: number;
    }[]>;
    getOfferAcceptanceRate(): Promise<number>;
    getAllMetrics(): Promise<{
        timeToHire: number;
        applicantsPerJob: {
            jobId: number;
            title: string;
            applicantCount: number;
        }[];
        offerAcceptanceRate: number;
    }>;
}
