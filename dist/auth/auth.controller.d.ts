import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: string;
        };
    } | {
        message: string;
    }>;
    register(body: {
        email: string;
        password: string;
        role?: 'HR' | 'CANDIDATE';
    }): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
        };
    }>;
}
