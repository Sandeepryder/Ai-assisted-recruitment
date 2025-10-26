import { FeedbackService } from "../services/feedback.service";
export declare class FeedbackController {
    private readonly feedbackservice;
    constructor(feedbackservice: FeedbackService);
    createFeedback(body: {
        candidateId: number;
        interviewer: string;
        rating: number;
        notes?: string;
    }): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
    getAllFeedback(): Promise<void>;
    getFeedback(id: string): Promise<{
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
    updateFeedback(id: string, body: {
        interviewer?: string;
        rating?: number;
        notes?: string;
    }): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
    deleteFeedback(id: string): Promise<{
        id: number;
        candidateId: number;
        interviewer: string;
        rating: number;
        notes: string;
        createdAt: Date;
    }>;
}
