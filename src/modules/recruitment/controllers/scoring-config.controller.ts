import { Controller , Get , Post , Put, Delete, Body , Param } from "@nestjs/common";
import { ScoringConfigService } from "../services/scoring-config.service";
// import { PrismaService } from "../services/prisma.services";

@Controller('scoring-config')
export class ScoringConfigController {
  constructor(private readonly scoringConfigService : ScoringConfigService){}

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

    @Put(":id")
    async updateScoringConfig( @Param('id') id: string, @Body() body :{name ?: string , config ?: string }){
        return this.scoringConfigService.updateConfig(Number(id), body)
    }

    @Delete(':id')
    async deleteConfig(@Param("id") id: string) {
        return this.scoringConfigService.deleteConfig(Number(id));
  }

}