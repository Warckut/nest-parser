import { Test, TestingModule } from '@nestjs/testing';
import { VideocardsController } from './videocards.controller';

describe('VideocardsController', () => {
  let controller: VideocardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideocardsController],
    }).compile();

    controller = module.get<VideocardsController>(VideocardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
