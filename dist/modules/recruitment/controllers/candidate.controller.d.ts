import { CandidateService } from "../services/candidate.service";
export declare class CandidateController {
    private readonly candidateService;
    constructor(candidateService: CandidateService);
    createCandidate(body: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        jobId: number;
    }): Promise<{
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
