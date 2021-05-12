import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuppeteerModule } from 'nest-puppeteer';
import { VideocardOrmEntity } from './entities/videocard.orm-entity';
import { ParserService } from './parser.service';
import { PuppeteerService } from './puppeteer.service';
import { VideocardsController } from './videocards.controller';
import { VideocardsService } from './videocards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideocardOrmEntity]),
    ScheduleModule.forRoot(),
    PuppeteerModule.forRoot(
      { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
      'Chrome', // optional, can be useful for using Chrome and Firefox in the same project
    ),
],
  controllers: [VideocardsController],
  providers: [PuppeteerService, VideocardsService, ParserService]
})
export class VideocardsModule {}
