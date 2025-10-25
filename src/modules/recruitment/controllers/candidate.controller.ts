import { Controller, Post, Body } from "@nestjs/common";
import { CandidateService } from "../services/candidate.service";

@Controller('candidate')
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) {}
    @Post('create')
    async createCandidate(
    // @Body() body: { firstName: string; lastName: string; email: string; phone?: string; jobId: number }
    @Body() body: { firstName: string; lastName: string; email: string; phone?: string; jobId: number }

  ) {
    return this.candidateService.createCandidate(body);
  }
}

