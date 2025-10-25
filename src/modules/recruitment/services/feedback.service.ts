import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class FeedbackService{
    constructor(private prisma :PrismaService){}

    async createFeedback(data : any){
        return this.prisma.feedback.create({
            data :{
                candidateId : data.candidateId,
                interviewer :data.interviewer,
                rating :data.rating,
                notes :data.notes || ''
            }
        })
    }

    async getAllFeedback() {
        return this.prisma.feedback.findMany({
            include: { candidate: true },
        });
    }

    async getFeedback(id: number) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: { candidate: true },
    });
    if (!feedback) throw new NotFoundException(`Feedback with id ${id} not found`);
    return feedback;
  }
  
  async updateInterview(id: number, data: any) {
        return this.prisma.feedback.update({
            where: { id },  
            data: {
                interviewer: data.interviewer,
                rating: data.rating,
                notes :data.notes
            },
        });
    }

  async deleteFeedback(id: number) {
    return this.prisma.feedback.delete({ where: { id } });
  }

}