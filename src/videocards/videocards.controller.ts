import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
// import { CrawlerService } from './Crawler.service';
import { CreateDto } from './dto';
import { VideocardOrmEntity } from './entities/videocard.orm-entity';
import { ParserService } from './parser.service';
import { VideocardsService } from './videocards.service';

@Controller('videocards')
export class VideocardsController {
    private readonly logger = new Logger(VideocardsService.name);
    constructor(
        // private readonly videocardsService: VideocardsService,
                private readonly parserService: ParserService
                ) {}

    @Get()
    getAll() {
        this.parserService.loadVideocardsSitilink()
        return "все заебись"
    }
    
    // @Get("add")
    // addVideocard(){
    //     // this.logger.debug(createDto);
    //     // const parser = new Parser(SITES)
    //     // parser.loadVideocards();
    //     return this.videocardsService.updateVideocards();
    // }
}
