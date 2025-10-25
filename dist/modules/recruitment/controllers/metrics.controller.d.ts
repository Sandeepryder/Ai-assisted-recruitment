import { MetricsService } from '../services/metrics.service';
export declare class MetricsController {
    private metricsService;
    constructor(metricsService: MetricsService);
    getMetrics(): Promise<{
        success: boolean;
        data: {
            timeToHire: number;
            applicantsPerJob: {
                jobId: number;
                title: string;
                applicantCount: number;
            }[];
            offerAcceptanceRate: number;
        };
    }>;
}
