import { PrismaService } from "../services/prisma.services";
export declare class InterviewController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    updateInterview(id: string, body: {
        scheduledAt?: string;
        status?: string;
        interviewer?: string;
    }): Promise<{
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
