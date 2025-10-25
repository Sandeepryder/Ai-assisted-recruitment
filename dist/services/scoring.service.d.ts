export declare class ScoringService {
    constructor();
    scoreResume(candidateId: number, text: string): Promise<{
        finalScore: number;
        breakdown: {
            keywordScore: number;
            tfidfSimilarity: number;
            experienceScore: number;
        };
        matchedKeywords: string[];
    }>;
    tokenize(text: string): string[];
    computeTfidfSimilarity(jobDesc: string, resume: string): number;
    extractExperience(text: string): number;
}
