import { Test, TestingModule } from '@nestjs/testing';
import { VideocardsService } from './videocards.service';

describe('VideocardsService', () => {
  let service: VideocardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideocardsService],
    }).compile();

    service = module.get<VideocardsService>(VideocardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
