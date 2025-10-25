import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';

@Module({
    imports: [RecruitmentModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
