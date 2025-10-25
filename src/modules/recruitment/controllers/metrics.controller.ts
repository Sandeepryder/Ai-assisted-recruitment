import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../services/metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get()
  async getMetrics() {
    const data = await this.metricsService.getAllMetrics();
    return { success: true, data };
  }
}
