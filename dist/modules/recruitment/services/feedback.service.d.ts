import { PrismaService } from "./prisma.services";
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    createFeedback(data: any): Promise<{
        id: number;
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
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
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
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
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
    updateFeedback(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
    deleteFeedback(id: number): Promise<{
        id: number;
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
}
