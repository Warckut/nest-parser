import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Videocard } from 'src/domains/entities/Videocard';
import { Repository } from 'typeorm';
import { VideocardOrmEntity } from './entities/videocard.orm-entity'
import { ParserService } from './parser.service';
import { AccountMapper } from './videocards.mapper';

@Injectable()
export class VideocardsService {
    private readonly logger = new Logger(VideocardsService.name);
    constructor(
        @InjectRepository(VideocardOrmEntity)
        private videocardsRepository: Repository<VideocardOrmEntity>,
        private readonly parserService: ParserService,
    ) {}

    @Cron('0 0 2 * * *')
    async handleCron() {
        await this.updateVideocards()
    }

    saveVideocard(videocard: VideocardOrmEntity): Promise<VideocardOrmEntity> {
        return this.videocardsRepository.save(videocard);
    }

    async removeAll(): Promise<void> {
        const videocards = await this.videocardsRepository.find();
        for (const videocard of videocards)
            this.videocardsRepository.delete(videocard.id)
    }

    async updateVideocards() {
        const shuffle = (arr: any) => {
            for (let i = arr.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr
          }
        const videocards: Videocard[] = shuffle(await this.parserService.loadAllVideocards()) 
        await this.removeAll()
        
        for (const videocard of videocards) {
            this.logger.debug(`${videocard.name}`)
            const videocardOrmEntity = AccountMapper.mapToOrmEntity(videocard)
            this.saveVideocard(videocardOrmEntity)
        }
    }

    async getVideocards() {
        const viedocardsOrmEntity = await this.videocardsRepository.find();
        const videocards: Videocard[] = []
        for (const videocardOrmEntity of viedocardsOrmEntity) {
            this.logger.debug(`${videocardOrmEntity.name}`)
            const videocard = AccountMapper.mapToOrmEntity(videocardOrmEntity)
            videocards.push(videocard)
        }
        return videocards
    }
}
