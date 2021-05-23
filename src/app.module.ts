import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideocardsModule } from './videocards/videocards.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    VideocardsModule
  ]
})
export class AppModule {}
