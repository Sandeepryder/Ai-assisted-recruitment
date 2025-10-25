import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [RecruitmentModule, AuthModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
