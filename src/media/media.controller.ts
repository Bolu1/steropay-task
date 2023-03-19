import { MediaService } from './media.service';
import { Controller, Post, Get, Param, Body, Query, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { Request } from 'express'
import { MediaDto } from './dto/media.dto';

@Controller('media')
export class MediaController {

    constructor(private mediaService: MediaService) {}

    @Post('/')
    createMedia(
        @Body() dto: MediaDto,
        ){
        return this.mediaService.createMedia(dto)
    }

    @Get('/')
    getManyMedia(
        @Query('page', ParseIntPipe) page,
        @Query('perPage', ParseIntPipe) perPage
    ){
        return this.mediaService.getManyMedia(page, perPage)
    }

    @Get('fetchById/:id')
    getMediaById(
        @Param('id') id
    ){
        return this.mediaService.getManyMediaById(id)
    }

    @Get('/search')
    searchMedia(
        @Query('query') query
    ){
        return this.mediaService.searchMedia(query)
    }

    @Patch('/:id')
    editMedia(
        @Param('id') id,
        @Body('status') status
    ){
        return this.mediaService.editMedia(id, status)
    }

    @Delete('/:id')
    deleteMedia(
        @Param('id') id,
    ){
        return this.mediaService.deleteMedia(id)
    }
}
