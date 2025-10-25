import { PrismaService } from "./prisma.services";
export declare class JobService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            title: string;
            description: string;
            createdAt: Date;
            scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
        };
    }>;
    getAllJobs(): Promise<({
        candidates: {
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
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
}
