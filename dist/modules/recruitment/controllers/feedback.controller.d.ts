import { PrismaService } from "../services/prisma.services";
export declare class FeedbackController {
    private readonly prismaservice;
    constructor(prismaservice: PrismaService);
    createFeedback(body: {
        candidateId: number;
        interviewer: string;
        rating: number;
        notes?: string;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            createdAt: Date;
            candidateId: number;
            interviewer: string;
            rating: number;
            notes: string;
        };
    }>;
    getAllFeedback(): Promise<({
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
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    })[]>;
    getFeedback(id: string): Promise<{
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
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
    updateFeedback(id: string, body: {
        interviewer?: string;
        rating?: number;
        notes?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
    deleteFeedback(id: string): Promise<{
        id: number;
        createdAt: Date;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
    }>;
}
