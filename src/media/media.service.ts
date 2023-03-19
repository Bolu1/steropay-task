import { HttpSuccessResponse } from './../../core/http-exception.filter.';
import { MediaDto } from './dto/media.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, BadRequestException, HttpStatus } from '@nestjs/common'
import { generateString } from 'utils/constants';

@Injectable({})
export class MediaService{

    constructor(private prisma: PrismaService){}

    async createMedia(dto:MediaDto){
        try{

          // validate status field
          if(dto.status != 'Active' && dto.status != 'Inactive' ){
            throw new HttpException({
              status: "Error",
              message: 'Invalid status value',
            }, HttpStatus.BAD_REQUEST);
          }

            await this.prisma.media.create({
            data: {
              name: dto.name,
              description: dto.description,
              type: dto.type,
              status: dto.status,
              url: generateString(16, true, true),
            },
          });
          return {
            status: "success",
            message: "Media created"
          }
        }catch(error){
          throw error
        }
    }

    async getManyMedia(page:number, perPage:number){
      try{
        const skip = (page-1)*perPage
        const results = await this.prisma.media.findMany({
          skip: skip < 0 ? 0:skip,
          take: perPage,
        })
        return {
          status: "success",
          message: "Successful",
          data: results
        }
      }catch(error){
        throw error
      }
  }

  async getManyMediaById(id:string){
    try{
      const results = await this.prisma.media.findMany({
        where:{
            id: id
        } 
    })
      return {
        status: "success",
        message: "Successful",
        data: results
      }
    }catch(error){
      throw error
    }
}

async searchMedia(query:string){
  try{
    // use raw query to implement regex search
    const results = await this.prisma.$queryRaw`SELECT * FROM Media WHERE name REGEXP ${query} OR description REGEXP ${query}`
    console.log(results)
    return {
      status: "success",
      message: "Successful",
      data: results
    }
  }catch(error){
    throw error
  }
}


async editMedia(id:string, status:string){
  try{

    // validate status field
    if(status != 'Active' && status != 'Inactive' ){
      throw new HttpException({
        status: "Error",
        message: 'Invalid status value',
      }, HttpStatus.BAD_REQUEST);
    }

    const results = await this.prisma.media.update({
      where:{
        id: id
      },
      data:{
        status: status
      }
    })
     
    return {
      status: "success",
      message: "Updated"
    }
  }catch(error){
    throw error
  }
}

async deleteMedia(id:string){
  try{

    const results = await this.prisma.media.update({
      where:{
        id: id
      },
      data:{
        status: "Deleted",
        deletedAt:new Date()
      }
    })
     
    return {
      status: "success",
      message: "Deleted"
    }
  }catch(error){
    throw error
  }
}
}