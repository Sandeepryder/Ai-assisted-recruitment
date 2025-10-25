import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        jobId: number;
        score: number;
        scoreBreakdown: import("@prisma/client/runtime/library").JsonValue;
        status: string;
        createdAt: Date;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
