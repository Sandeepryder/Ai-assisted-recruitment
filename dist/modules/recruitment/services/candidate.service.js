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
exports.CandidateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("./prisma.services");
let CandidateService = class CandidateService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCandidate(data) {
        const jobId = Number(data.jobId);
        if (Number.isNaN(jobId)) {
            throw new common_1.BadRequestException("Invalid jobId");
        }
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new common_1.BadRequestException(`Job with id ${jobId} not found. Create job first.`);
        }
        const result = await this.prisma.candidate.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                job: { connect: { id: jobId } },
            },
        });
        return { success: true, data: result };
    }
    async getAllCandidates() {
        return this.prisma.candidate.findMany({
            include: { job: true, parsedResume: true },
        });
    }
    async getCandidate(id) {
        const candidate = await this.prisma.candidate.findUnique({
            where: { id },
            include: { job: true, parsedResume: true },
        });
        if (!candidate)
            throw new common_1.NotFoundException(`Candidate with id ${id} not found`);
        return candidate;
    }
    async updateCandidate(id, data) {
        return this.prisma.candidate.update({
            where: { id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                status: data.status,
            },
        });
    }
    async deleteCandidate(id) {
        return this.prisma.candidate.delete({ where: { id } });
    }
};
exports.CandidateService = CandidateService;
exports.CandidateService = CandidateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], CandidateService);
//# sourceMappingURL=candidate.service.js.map