import { PrismaService } from "./prisma.services";
export declare class InterviewService {
    private prisma;
    constructor(prisma: PrismaService);
    createInterview(data: any): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            status: string;
            candidateId: number;
            scheduledAt: Date;
            interviewer: string;
        };
    }>;
    getAllInterviews(): Promise<({
        candidate: {
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
    } & {
        id: number;
        createdAt: Date;
        status: string;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    })[]>;
    getInterview(id: number): Promise<{
        candidate: {
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
    } & {
        id: number;
        createdAt: Date;
        status: string;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
    updateInterview(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        status: string;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
    deleteInterview(id: number): Promise<{
        id: number;
        createdAt: Date;
        status: string;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
}
