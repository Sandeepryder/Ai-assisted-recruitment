import { Controller, Get, UseGuards } from '@nestjs/common';
import { MetricsService } from '../services/metrics.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}


    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getMetrics() {
        const data = await this.metricsService.getAllMetrics();
        return { success: true, data };
    }
}
