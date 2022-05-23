import { Test, TestingModule } from '@nestjs/testing';
import { GetUsersExecutorService } from './get-users-executor.service';

describe('GetUsersExecutorService', () => {
  let service: GetUsersExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUsersExecutorService],
    }).compile();

    service = module.get<GetUsersExecutorService>(GetUsersExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
