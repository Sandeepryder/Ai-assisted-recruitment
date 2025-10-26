import { Controller, Post, Get , Put , Delete , Param , Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "../services/prisma.services";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { FeedbackService } from "../services/feedback.service";


@Controller('feedback')
export class FeedbackController{
    constructor(private readonly feedbackservice : FeedbackService){}

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    async createFeedback(
        @Body() body :{candidateId: number; interviewer: string; rating: number; notes?: string}
    ){
        return this.feedbackservice.createFeedback(body)
    }


    @Get('all')
    async getAllFeedback(){
       this.feedbackservice.getAllFeedback()
    }

    @Get(':id')
    async getFeedback(@Param('id') id :string){
        return this.feedbackservice.getFeedback(Number(id))
    }

    @Roles('HR')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async updateFeedback(
        @Param('id') id :string,
        @Body() body :{interviewer? :string ,rating?:number , notes?:string }
    ){
        return this.feedbackservice.updateFeedback(Number(id), body)
    }

    @Delete(':id')
    async deleteFeedback(@Param('id') id :string){
        return this.feedbackservice.deleteFeedback(Number(id))
    }
}
