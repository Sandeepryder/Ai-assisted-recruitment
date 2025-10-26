import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private jwt;
    private prisma;
    constructor(jwt: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        password: string;
        role: string;
    }>;
    register(data: {
        email: string;
        password: string;
        role?: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            createdAt: Date;
            email: string;
            password: string;
            role: string;
        };
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: string;
        };
    }>;
}
