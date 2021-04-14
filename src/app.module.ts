import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideocardsModule } from './videocards/videocards.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    VideocardsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
