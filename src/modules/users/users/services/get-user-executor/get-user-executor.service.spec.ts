import { Test, TestingModule } from '@nestjs/testing';
import { GetUserExecutorService } from './get-user-executor.service';

describe('GetUserExecutorService', () => {
  let service: GetUserExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserExecutorService],
    }).compile();

    service = module.get<GetUserExecutorService>(GetUserExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
