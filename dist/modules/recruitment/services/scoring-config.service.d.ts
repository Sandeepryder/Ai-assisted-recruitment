import { PrismaService } from "./prisma.services";
export declare class ScoringConfigService {
    private prisma;
    constructor(prisma: PrismaService);
    createConfig(data: any): Promise<{
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
    getConfig(id: number): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
    updateConfig(id: number, data: any): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
    deleteConfig(id: number): Promise<{
        id: number;
        name: string;
        config: import("@prisma/client/runtime/library").JsonValue;
        updatedAt: Date;
    }>;
}
