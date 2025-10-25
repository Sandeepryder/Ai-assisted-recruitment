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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("../services/prisma.services");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
let FeedbackController = class FeedbackController {
    constructor(prismaservice) {
        this.prismaservice = prismaservice;
    }
    async createFeedback(body) {
        const result = await this.prismaservice.feedback.create({
            data: {
                candidateId: body.candidateId,
                interviewer: body.interviewer,
                rating: body.rating,
                notes: body.notes
            }
        });
        return { success: true, data: result };
    }
    async getAllFeedback() {
        return this.prismaservice.feedback.findMany({
            include: { candidate: true }
        });
    }
    async getFeedback(id) {
        const feedback = await this.prismaservice.feedback.findUnique({
            where: { id: Number(id) },
            include: { candidate: true }
        });
        return feedback;
    }
    async updateFeedback(id, body) {
        return this.prismaservice.feedback.update({
            where: { id: Number(id) },
            data: {
                interviewer: body.interviewer,
                rating: body.rating,
                notes: body.notes
            }
        });
    }
    async deleteFeedback(id) {
        return this.prismaservice.feedback.delete({ where: { id: Number(id) } });
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, roles_decorator_1.Roles)('HR'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getAllFeedback", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getFeedback", null);
__decorate([
    (0, roles_decorator_1.Roles)('HR'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "updateFeedback", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "deleteFeedback", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, common_1.Controller)('feedback'),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], FeedbackController);
//# sourceMappingURL=feedback.controller.js.map