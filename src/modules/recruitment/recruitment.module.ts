import { Module, Res } from "@nestjs/common";
import { ResumeController } from "./controllers/resume.controller";
import { ResumeService } from "./services/resume.service";
import { ScoringService } from "./services/scoring.service";
import { PrismaService } from "./services/prisma.services";
import { CandidateService } from "./services/candidate.service";
import { CandidateController } from "./controllers/candidate.controller";
import { JobService } from "./services/job.service";
import { JobController } from "./controllers/job.controllers";
import { InterviewController } from "./controllers/interview.controller";
import { InterviewService } from "./services/interview.service";
import { FeedbackController } from "./controllers/feedback.controller";
import { FeedbackService } from "./services/feedback.service";
import { ScoringConfigController } from "./controllers/scoring-config.controller";
import { ScoringConfigService } from "./services/scoring-config.service";
@Module({
    imports: [],
    controllers: [
        ResumeController,
        CandidateController,
        JobController,
        InterviewController,
        FeedbackController,
        ScoringConfigController
    ],
    providers: [ResumeService,ScoringService,PrismaService,CandidateService,JobService, InterviewService , FeedbackService,ScoringConfigService],
})
export class RecruitmentModule {}