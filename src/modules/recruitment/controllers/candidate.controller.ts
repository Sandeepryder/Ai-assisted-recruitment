import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CandidateService } from "../services/candidate.service";

@Controller("candidate")
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post("create")
  async createCandidate(
    // @Body() body: { firstName: string; lastName: string; email: string; phone?: string; jobId: number }
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      jobId: number;
    }
  ) {
    return this.candidateService.createCandidate(body);
  }

  @Get("all")
  async getAllCandidates() {
    return this.candidateService.getAllCandidates();
  }

  @Get(":id")
  async getCandidate(@Param("id") id: string) {
    return this.candidateService.getCandidate(Number(id));
  }

  @Put(":id")
  async updateCandidate(
    @Param("id") id: string,
    @Body()
    body: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      status?: string;
    }
  ) {
    return this.candidateService.updateCandidate(Number(id), body);
  }

  @Put(':id/update-status')
  async updateStatus(@Param('id') id: string) {
    return this.candidateService.updateStatusBasedOnScore(Number(id));
  }

  @Delete(":id")
  async deleteCandidate(@Param("id") id: string) {
    return this.candidateService.deleteCandidate(Number(id));
  }
}
