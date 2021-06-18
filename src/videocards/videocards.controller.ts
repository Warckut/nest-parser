import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { VideocardsService } from './videocards.service';

@Controller('videocards')
export class VideocardsController {
    private readonly logger = new Logger(VideocardsService.name);
    constructor(
        private readonly videocardsService: VideocardsService
    ) {}

    @Get('/')
    async getAll() {
        return await this.videocardsService.getVideocards()
    }

    @Get("update")
    async update(){
        this.videocardsService.updateVideocards()
    }
}
