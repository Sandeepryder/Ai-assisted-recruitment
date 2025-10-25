import { Controller, Post, Get , Put , Delete , Param , Body } from "@nestjs/common";
import { PrismaService } from "../services/prisma.services";


@Controller('feedback')
export class FeedbackController{
    constructor(private readonly prismaservice : PrismaService){}
    @Post('create')
    async createFeedback(
        @Body() body :{candidateId: number; interviewer: string; rating: number; notes?: string}
    ){
        const result = await this.prismaservice.feedback.create({
            data :{
                candidateId : body.candidateId,
                interviewer : body.interviewer,
                rating :body.rating,
                notes : body.notes
            }
        });
        return {success :true , data :result}
    }


    @Get('all')
    async getAllFeedback(){
        return this.prismaservice.feedback.findMany({
            include :{candidate :true}
        })
    }

    @Get(':id')
    async getFeedback(@Param('id') id :string){
        const feedback = await this.prismaservice.feedback.findUnique({
            where  :{id :Number(id)},
            include :{candidate :true}
        });
        return feedback
    }

    @Put(':id')
    async updateFeedback(
        @Param('id') id :string,
        @Body() body :{interviewer? :string ,rating?:number , notes?:string }
    ){
        return this.prismaservice.feedback.update({
            where: { id: Number(id) },  
            data :{
                interviewer : body.interviewer,
                rating : body.rating,
                notes : body.notes
            }
        })
    }

    @Delete(':id')
    async deleteFeedback(@Param('id') id :string){
        return this.prismaservice.feedback.delete({where :{id :Number(id)}})
    }
}
