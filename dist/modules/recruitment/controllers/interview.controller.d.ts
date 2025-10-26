import { InterviewService } from "../services/interview.service";
export declare class InterviewController {
    private readonly interviewService;
    constructor(interviewService: InterviewService);
    createInterview(body: {
        candidateId: number;
        scheduledAt: string;
        interviewer: string;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            candidateId: number;
            scheduledAt: Date;
            interviewer: string;
            status: string;
            createdAt: Date;
        };
    }>;
    getAllInterviews(): Promise<({
        candidate: {
            id: number;
            status: string;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    })[]>;
    getInterview(id: string): Promise<{
        candidate: {
            id: number;
            status: string;
            createdAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            jobId: number;
            score: number;
            scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    }>;
    updateInterview(id: string, body: any): Promise<{
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    }>;
    deleteInterview(id: string): Promise<{
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    }>;
}
