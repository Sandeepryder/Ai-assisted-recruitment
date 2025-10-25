"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwt) {
        this.jwt = jwt;
        this.prisma = new client_1.PrismaClient();
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return null;
        return user;
    }
    async register(data) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing)
            throw new common_1.BadRequestException("User already exists");
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
    async login(data) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid)
            return null;
        const token = this.jwt.sign({ id: user.id, email: user.email, role: user.role });
        return { access_token: token, user: { id: user.id, email: user.email, role: user.role } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map