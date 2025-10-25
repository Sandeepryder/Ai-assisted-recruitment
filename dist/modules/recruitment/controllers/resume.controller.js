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
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const resume_service_1 = require("../services/resume.service");
const multer_1 = require("multer");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async uploadResume(file, candidateIdString) {
        if (!file) {
            throw new common_1.BadRequestException('File not uploaded');
        }
        const candidateId = parseInt(candidateIdString, 10);
        if (isNaN(candidateId)) {
            throw new common_1.BadRequestException('Invalid candidateId');
        }
        return this.resumeService.uploadResume(file, candidateId);
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, roles_decorator_1.Roles)('HR'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('candidateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "uploadResume", null);
exports.ResumeController = ResumeController = __decorate([
    (0, common_1.Controller)('resume'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map