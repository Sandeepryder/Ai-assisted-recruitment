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
