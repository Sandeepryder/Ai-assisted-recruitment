"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentModule = void 0;
const common_1 = require("@nestjs/common");
const resume_controller_1 = require("./controllers/resume.controller");
const resume_service_1 = require("./services/resume.service");
const scoring_service_1 = require("./services/scoring.service");
const prisma_services_1 = require("./services/prisma.services");
const candidate_service_1 = require("./services/candidate.service");
const candidate_controller_1 = require("./controllers/candidate.controller");
const job_service_1 = require("./services/job.service");
const job_controllers_1 = require("./controllers/job.controllers");
let RecruitmentModule = class RecruitmentModule {
};
exports.RecruitmentModule = RecruitmentModule;
exports.RecruitmentModule = RecruitmentModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            resume_controller_1.ResumeController,
            candidate_controller_1.CandidateController,
            job_controllers_1.JobController
        ],
        providers: [resume_service_1.ResumeService, scoring_service_1.ScoringService, prisma_services_1.PrismaService, candidate_service_1.CandidateService, job_service_1.JobService],
    })
], RecruitmentModule);
//# sourceMappingURL=recruitment.module.js.map