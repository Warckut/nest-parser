import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { VideocardsService } from './videocards.service';

@Controller('videocards')
export class VideocardsController {
    private readonly logger = new Logger(VideocardsService.name);
    constructor(
        private readonly videocardsService: VideocardsService
        ) {}

    @Get()
    async getAll() {
        // this.videocardsService.updateVideocards()
        return await this.videocardsService.getVideocards()
        // return "все заебись"
    }

    @Get("update")
    async update(){
        this.videocardsService.updateVideocards()
    }

    // @Get('citilink')
    // async getCitilinkVideocards() {
    //     return await this.videocardsService.getCitilinkVideocards()
    // }


    // @Get("add")
    // addVideocard(){
    //     // this.logger.debug(createDto);
    //     // const parser = new Parser(SITES)
    //     // parser.loadVideocards();
    //     return this.videocardsService.updateVideocards();
    // }
}
