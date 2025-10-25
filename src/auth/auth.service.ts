import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  constructor(private jwt: JwtService) {}

  
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
       
        return user;
    }



  async register(data: { email: string; password: string ,role?: string}) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new BadRequestException("User already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role || 'CANDIDATE',
      },
    });

    return { message: "User registered successfully", user };
  }


    async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) return null;

    const token = this.jwt.sign({ id: user.id, email: user.email, role: user.role });
    return { access_token: token, user: { id: user.id, email: user.email, role: user.role } };
}

}
