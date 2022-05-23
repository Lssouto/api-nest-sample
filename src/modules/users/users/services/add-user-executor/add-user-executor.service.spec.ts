import { Test, TestingModule } from '@nestjs/testing';
import { AddUserExecutorService } from './add-user-executor.service';

describe('AddUser-executorService', () => {
  let service: AddUserExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddUserExecutorService],
    }).compile();

    service = module.get<AddUserExecutorService>(AddUserExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
