import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Videocard } from 'src/domains/entities/Videocard';
import { Repository } from 'typeorm';
import { VideocardOrmEntity } from './entities/videocard.orm-entity'
import puppeteer from 'puppeteer'
import { ParserService } from './parser.service';

@Injectable()
export class VideocardsService {
    private readonly logger = new Logger(VideocardsService.name);
    constructor(
        @InjectRepository(VideocardOrmEntity)
        private videocardsRepository: Repository<VideocardOrmEntity>,
        private readonly parserService: ParserService,
    ) {}

    @Cron('20 * * * * *')
    handleCron() {
        // вызываем метод, который возвращает массив видеокарт, передавая в него массив сайтов
        // сохраняем в репозиторй массив видеокарт
        this.logger.debug('Called when the current second is 20');
    }

    create(videocard: VideocardOrmEntity): Promise<VideocardOrmEntity> {
        return this.videocardsRepository.save(videocard);
    }

    async updateVideocards() {
        const videocards  = await this.parserService.loadAllVideocards() 
        for (const videocard of videocards)
        if (
        !this.videocardsRepository.findOne({ 
            code: videocard.code, 
            href: videocard.href,
            price: videocard.price,
            title: videocard.title
        }) ) {
            return this.videocardsRepository.save(videocardOrmEntity);
        }
        return {};
    }
    
}
