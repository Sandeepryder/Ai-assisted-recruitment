import { PrismaService } from './prisma.services';
export declare class CandidateService {
    private prisma;
    constructor(prisma: PrismaService);
    createCandidate(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
        };
    }>;
}
