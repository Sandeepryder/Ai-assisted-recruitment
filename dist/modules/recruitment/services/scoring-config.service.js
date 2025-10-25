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
exports.ScoringConfigService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("./prisma.services");
let ScoringConfigService = class ScoringConfigService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConfig(data) {
        const res = await this.prisma.scoringConfig.create({
            data: {
                name: data.name,
                config: data.config
            }
        });
        return { success: true, data: res };
    }
    async getAllConfigs() {
        return this.prisma.scoringConfig.findMany();
    }
    async getConfig(id) {
        const config = await this.prisma.scoringConfig.findUnique({ where: { id } });
        if (!config)
            throw new common_1.NotFoundException(`Scoring config with id ${id} not found`);
        return config;
    }
    async updateConfig(id, data) {
        return this.prisma.scoringConfig.update({
            where: { id },
            data: {
                name: data.name,
                config: data.config
            }
        });
    }
    async deleteConfig(id) {
        return this.prisma.scoringConfig.delete({ where: { id } });
    }
};
exports.ScoringConfigService = ScoringConfigService;
exports.ScoringConfigService = ScoringConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], ScoringConfigService);
//# sourceMappingURL=scoring-config.service.js.map