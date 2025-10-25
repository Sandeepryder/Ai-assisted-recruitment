import { Controller, Post,Get , Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CandidateService } from "../services/candidate.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller('candidate')
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) {}

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    async createCandidate(
    // @Body() body: { firstName: string; lastName: string; email: string; phone?: string; jobId: number }
    @Body() body: { firstName: string; lastName: string; email: string; phone?: string; jobId: number }

  ) {
    return this.candidateService.createCandidate(body);
  }

  @Get('all')
  async getAllCandidates() {
    return this.candidateService.getAllCandidates();
  }

   @Get(':id')
  async getCandidate(@Param('id') id: string) {
    return this.candidateService.getCandidate(Number(id));
  }

  @Roles('HR')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCandidate(
    @Param('id') id: string,
    @Body() body: { 
      firstName?: string; 
      lastName?: string; 
      email?: string; 
      phone?: string; 
      status?: string 
    }
  ) {
    return this.candidateService.updateCandidate(Number(id), body);
  }

  @Delete(':id')
  async deleteCandidate(@Param('id') id: string) {
    return this.candidateService.deleteCandidate(Number(id));
  }

}

