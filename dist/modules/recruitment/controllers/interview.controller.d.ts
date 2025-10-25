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
            status: string;
            createdAt: Date;
            candidateId: number;
            scheduledAt: Date;
            interviewer: string;
        };
    }>;
    getAllInterviews(): Promise<({
        candidate: {
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
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    })[]>;
    getInterview(id: string): Promise<{
        candidate: {
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
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
    updateInterview(id: string, body: {
        scheduledAt?: string;
        status?: string;
        interviewer?: string;
    }): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
    deleteInterview(id: string): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
}
