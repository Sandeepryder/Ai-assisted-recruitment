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
exports.CandidateController = void 0;
const common_1 = require("@nestjs/common");
const candidate_service_1 = require("../services/candidate.service");
let CandidateController = class CandidateController {
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    async createCandidate(body) {
        return this.candidateService.createCandidate(body);
    }
    async getAllCandidates() {
        return this.candidateService.getAllCandidates();
    }
    async getCandidate(id) {
        return this.candidateService.getCandidate(Number(id));
    }
    async updateCandidate(id, body) {
        return this.candidateService.updateCandidate(Number(id), body);
    }
    async updateStatus(id) {
        return this.candidateService.updateStatusBasedOnScore(Number(id));
    }
    async deleteCandidate(id) {
        return this.candidateService.deleteCandidate(Number(id));
    }
    async applyJob(body) {
        return this.candidateService.applyForJob(body.candidateId, body.jobId);
    }
};
exports.CandidateController = CandidateController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "createCandidate", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "getAllCandidates", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "getCandidate", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "updateCandidate", null);
__decorate([
    (0, common_1.Put)(":id/update-status"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "deleteCandidate", null);
__decorate([
    (0, common_1.Post)("apply"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "applyJob", null);
exports.CandidateController = CandidateController = __decorate([
    (0, common_1.Controller)("candidate"),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService])
], CandidateController);
//# sourceMappingURL=candidate.controller.js.map