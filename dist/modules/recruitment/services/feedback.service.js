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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("./prisma.services");
let FeedbackService = class FeedbackService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFeedback(data) {
        return this.prisma.feedback.create({
            data: {
                candidateId: data.candidateId,
                interviewer: data.interviewer,
                rating: data.rating,
                notes: data.notes || ''
            }
        });
    }
    async getAllFeedback() {
        return this.prisma.feedback.findMany({
            include: { candidate: true },
        });
    }
    async getFeedback(id) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id },
            include: { candidate: true },
        });
        if (!feedback)
            throw new common_1.NotFoundException(`Feedback with id ${id} not found`);
        return feedback;
    }
    async updateFeedback(id, data) {
        return this.prisma.feedback.update({
            where: { id },
            data: {
                interviewer: data.interviewer,
                rating: data.rating,
                notes: data.notes
            },
        });
    }
    async deleteFeedback(id) {
        return this.prisma.feedback.delete({ where: { id } });
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map