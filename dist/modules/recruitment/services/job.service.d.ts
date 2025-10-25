import { PrismaService } from "./prisma.services";
export declare class JobService {
    private prisma;
    constructor(prisma: PrismaService);
    createJob(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            title: string;
            description: string;
            scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
        };
    }>;
    getAllJobs(): Promise<({
        candidates: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
            createdAt: Date;
        }[];
    } & {
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    getJob(id: number): Promise<{
        candidates: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
            status: string;
            createdAt: Date;
        }[];
    } & {
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateJob(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteJob(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
