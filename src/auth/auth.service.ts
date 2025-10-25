import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
    private prisma = new PrismaClient();
    constructor(private jwtService: JwtService ) {}

//   async validateUser(email: string, password: string) {
//     // fetch user from DB and check password
//     const user = { id: 1, email, role: 'admin' }; // dummy
//     return user;
//   }
    async validateUser(email: string, password: string) {
        const user = await this.prisma.candidate.findUnique({ where: { email } });
        if (user && password === password) {
        const {  ...result } = user;
        return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}
