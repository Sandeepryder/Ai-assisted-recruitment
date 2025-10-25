import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.services";

@Injectable()
export class ScoringConfigService {
    constructor(private prisma :PrismaService){}

    async createConfig(data:any){
        const res = await this.prisma.scoringConfig.create({
            data :{
                name :data.name,
                config : data.config
            }
        });
        return {success :true , data :res}
    }

    async getAllConfigs(){
        return this.prisma.scoringConfig.findMany()
    }

    async getConfig(id :number ){
        const config = await this.prisma.scoringConfig.findUnique({ where: { id } });
        if (!config) throw new NotFoundException(`Scoring config with id ${id} not found`);
        return config;
    }

    async updateConfig(id :number , data :any){
        return this.prisma.scoringConfig.update({
            where :{id},
            data :{
                name : data.name,
                config : data.config
            }
        })
    }

    async deleteConfig(id :number){
        return this.prisma.scoringConfig.delete({where :{id}})
    }

}

