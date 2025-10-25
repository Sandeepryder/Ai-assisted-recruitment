import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ScoringService {
  constructor() {}

  async scoreResume(candidateId: number, text: string) {
    const job = await prisma.job.findFirst({
      where: { candidates: { some: { id: candidateId } } },
    });

    const jobKeywords: string[] = (job && (job as any).scoringKeywords) || [];
    const tokens = this.tokenize(text || '');
    const matched = tokens.filter((t) => jobKeywords.includes(t));
    const keywordScore = jobKeywords.length ? Math.min(1, matched.length / jobKeywords.length) : 0;
    const tfidfSimilarity = this.computeTfidfSimilarity(job?.description || '', text || '');
    const experienceScore = this.extractExperience(text || '');

    const weights = { w1: 0.45, w2: 0.35, w3: 0.15 };
    const finalScore =
      100 * (weights.w1 * keywordScore + weights.w2 * tfidfSimilarity + weights.w3 * experienceScore);

    return {
      finalScore,
      breakdown: { keywordScore, tfidfSimilarity, experienceScore },
      matchedKeywords: matched,
    };
  }

  tokenize(text: string): string[] {
    return (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  }

  computeTfidfSimilarity(jobDesc: string, resume: string): number {
    // simple overlap-based similarity (placeholder for proper TF-IDF)
    const jobWords = this.tokenize(jobDesc);
    const resumeWords = this.tokenize(resume);
    if (jobWords.length === 0 || resumeWords.length === 0) return 0;
    const common = jobWords.filter((w) => resumeWords.includes(w)).length;
    return common / Math.max(jobWords.length, resumeWords.length);
  }

  extractExperience(text: string): number {
    const match = (text || '').match(/(\d+)\s*(years|yrs|year)/i);
    if (!match) return 0;
    const years = parseInt(match[1], 10);
    return Math.min(1, years / 5); // cap at 5 years
  }
}
