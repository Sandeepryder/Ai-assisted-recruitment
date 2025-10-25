import { JobService } from "../services/job.service";
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    createJob(body: {
        title: string;
        description: string;
        scoringKeywords?: string[];
    }): Promise<{
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
    getJob(id: string): Promise<{
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
    updateJob(id: string, body: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    }>;
    deleteJob(id: string): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        scoringKeywords: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
