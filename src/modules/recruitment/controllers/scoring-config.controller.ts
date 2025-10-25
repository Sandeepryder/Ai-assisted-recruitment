import { Controller , Get , Post , Put, Delete, Body , Param, UseGuards } from "@nestjs/common";
import { ScoringConfigService } from "../services/scoring-config.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
// import { PrismaService } from "../services/prisma.services";

@Controller('scoring-config')
export class ScoringConfigController {
  constructor(private readonly scoringConfigService : ScoringConfigService){}

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    async createConfig(
    @Body() body: { name: string; config: any }){
        return this.scoringConfigService.createConfig(body)
    }

    @Get('all')
    async getAllConfigs() {
        return this.scoringConfigService.getAllConfigs();
    }

    @Get(":id")
    async getConfigById(@Param("id") id: string) {
        return this.scoringConfigService.getConfig(Number(id));
    }

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(":id")
    async updateScoringConfig( @Param('id') id: string, @Body() body :{name ?: string , config ?: string }){
        return this.scoringConfigService.updateConfig(Number(id), body)
    }

    @Delete(':id')
    async deleteConfig(@Param("id") id: string) {
        return this.scoringConfigService.deleteConfig(Number(id));
  }

}