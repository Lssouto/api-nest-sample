import { Test, TestingModule } from '@nestjs/testing';
import { ResponseFactoryService } from './response-factory.service';

describe('ResponseFactoryService', () => {
  let service: ResponseFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseFactoryService],
    }).compile();

    service = module.get<ResponseFactoryService>(ResponseFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
