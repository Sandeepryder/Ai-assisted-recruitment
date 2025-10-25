import { ScoringConfigService } from "../services/scoring-config.service";
export declare class ScoringConfigController {
    private readonly scoringConfigService;
    constructor(scoringConfigService: ScoringConfigService);
    createConfig(body: {
        name: string;
        config: any;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            name: string;
            config: import("@prisma/client/runtime/library").JsonValue;
            updatedAt: Date;
        };
    }>;
    getAllConfigs(): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }[]>;
    getConfigById(id: string): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
    updateScoringConfig(id: string, body: {
        name?: string;
        config?: string;
    }): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
    deleteConfig(id: string): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
}
