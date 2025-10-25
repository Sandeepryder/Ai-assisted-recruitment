import { PrismaService } from "./prisma.services";
export declare class InterviewService {
    private prisma;
    constructor(prisma: PrismaService);
    createInterview(data: any): Promise<{
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
    getInterview(id: number): Promise<{
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
    updateInterview(id: number, data: any): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
    deleteInterview(id: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        candidateId: number;
        scheduledAt: Date;
        interviewer: string;
    }>;
}
