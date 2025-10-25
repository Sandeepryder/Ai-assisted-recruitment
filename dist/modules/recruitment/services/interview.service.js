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
    async createInterview(data) {
        const result = await this.prisma.interview.create({
            data: {
                candidateId: data.candidateId,
                scheduledAt: new Date(data.scheduledAt),
                interviewer: data.interviewer,
                status: 'scheduled'
            },
        });
        return { success: true, data: result };
    }
    async getAllInterviews() {
        return this.prisma.interview.findMany({
            include: { candidate: true },
        });
    }
    async getInterview(id) {
        const interview = await this.prisma.interview.findUnique({
            where: { id },
            include: { candidate: true },
        });
        return interview;
    }
    async updateInterview(id, data) {
        return this.prisma.interview.update({
            where: { id },
            data: {
                scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
                status: data.mode,
                interviewer: data.interviewer,
            },
        });
    }
    async deleteInterview(id) {
        return this.prisma.interview.delete({ where: { id } });
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], JobService);
//# sourceMappingURL=interview.service.js.map