import { PrismaService } from "./prisma.services";
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    createFeedback(data: any): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
    getAllFeedback(): Promise<({
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
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    })[]>;
    getFeedback(id: number): Promise<{
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
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
    updateFeedback(id: number, data: any): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
    deleteFeedback(id: number): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
}
