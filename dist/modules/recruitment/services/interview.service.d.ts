import { PrismaService } from "./prisma.services";
export declare class InterviewService {
    private prisma;
    constructor(prisma: PrismaService);
    createInterview(data: any): Promise<{
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
    getInterview(id: number): Promise<{
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
    updateInterview(id: number, data: any): Promise<{
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    }>;
    deleteInterview(id: number): Promise<{
        id: number;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
        status: string;
        createdAt: Date;
    }>;
}
