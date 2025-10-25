"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("./prisma.services");
let JobService = class JobService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJob(data) {
        const result = await this.prisma.job.create({
            data: {
                title: data.title,
                description: data.description,
                scoringKeywords: data.scoringKeywords,
            },
        });
        return { success: true, data: result };
    }
    async getAllJobs() {
        return this.prisma.job.findMany({
            include: { candidates: true },
        });
    }
    async getJob(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: { candidates: true },
        });
        if (!job)
            throw new common_1.NotFoundException(`Job with id ${id} not found`);
        return job;
    }
    async updateJob(id, data) {
        return this.prisma.job.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                scoringKeywords: data.scoringKeywords || [],
            },
        });
    }
    async deleteJob(id) {
        return this.prisma.job.delete({ where: { id } });
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], JobService);
//# sourceMappingURL=job.service.js.map