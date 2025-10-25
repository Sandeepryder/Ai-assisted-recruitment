import { Module, Res } from "@nestjs/common";
import { ResumeController } from "./controllers/resume.controller";
import { ResumeService } from "./services/resume.service";
import { ScoringService } from "./services/scoring.service";
import { PrismaService } from "./services/prisma.services";
import { CandidateService } from "./services/candidate.service";
import { CandidateController } from "./controllers/candidate.controller";
import { JobService } from "./services/job.service";
import { JobController } from "./controllers/job.controllers";

@Module({
    imports: [],
    controllers: [
        ResumeController,
        CandidateController,
        JobController
    ],
    providers: [ResumeService,ScoringService,PrismaService,CandidateService,JobService],
})
export class RecruitmentModule {}