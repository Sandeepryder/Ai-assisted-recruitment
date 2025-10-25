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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("./prisma.services");
let MetricsService = class MetricsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTimeToHire() {
        const candidates = await this.prisma.candidate.findMany({
            where: { status: "hired" },
            select: {
                createdAt: true,
            },
        });
        if (!candidates.length)
            return 0;
        const totalDays = candidates.reduce((sum, c) => {
            const hiredAt = c.hiredAt || new Date();
            const days = (new Date(hiredAt).getTime() - new Date(c.createdAt).getTime()) /
                (1000 * 60 * 60 * 24);
            return sum + days;
        }, 0);
        return totalDays / candidates.length;
    }
    async getApplicantsPerJob() {
        const jobs = await this.prisma.job.findMany({
            include: { candidates: true },
        });
        return jobs.map((job) => ({
            jobId: job.id,
            title: job.title,
            applicantCount: job.candidates.length,
        }));
    }
    async getOfferAcceptanceRate() {
        const candidates = await this.prisma.candidate.findMany({
            select: { status: true },
        });
        if (!candidates.length)
            return 0;
        const offersExtended = candidates.filter((c) => c.status === "offered").length;
        const offersAccepted = candidates.filter((c) => c.status === "hired").length;
        return offersExtended ? (offersAccepted / offersExtended) * 100 : 0;
    }
    async getAllMetrics() {
        return {
            timeToHire: await this.getTimeToHire(),
            applicantsPerJob: await this.getApplicantsPerJob(),
            offerAcceptanceRate: await this.getOfferAcceptanceRate(),
        };
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map