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
exports.ScoringConfigController = void 0;
const common_1 = require("@nestjs/common");
const scoring_config_service_1 = require("../services/scoring-config.service");
let ScoringConfigController = class ScoringConfigController {
    constructor(scoringConfigService) {
        this.scoringConfigService = scoringConfigService;
    }
    async createConfig(body) {
        return this.scoringConfigService.createConfig(body);
    }
    async getAllConfigs() {
        return this.scoringConfigService.getAllConfigs();
    }
    async getConfigById(id) {
        return this.scoringConfigService.getConfig(Number(id));
    }
    async updateScoringConfig(id, body) {
        return this.scoringConfigService.updateConfig(Number(id), body);
    }
    async deleteConfig(id) {
        return this.scoringConfigService.deleteConfig(Number(id));
    }
};
exports.ScoringConfigController = ScoringConfigController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoringConfigController.prototype, "createConfig", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScoringConfigController.prototype, "getAllConfigs", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoringConfigController.prototype, "getConfigById", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScoringConfigController.prototype, "updateScoringConfig", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoringConfigController.prototype, "deleteConfig", null);
exports.ScoringConfigController = ScoringConfigController = __decorate([
    (0, common_1.Controller)('scoring-config'),
    __metadata("design:paramtypes", [scoring_config_service_1.ScoringConfigService])
], ScoringConfigController);
//# sourceMappingURL=scoring-config.controller.js.map