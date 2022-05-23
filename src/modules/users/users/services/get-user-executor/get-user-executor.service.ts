import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/helpers/error.helper';
import {
  EntityValidator,
  NotNullValidator,
  NumberValidator,
} from 'src/helpers/validators.helper';
import { ServiceExecutor } from 'src/model/service-executor.model';
import { DbService } from 'src/services/db/db.service';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class GetUserExecutorService extends ServiceExecutor {
  dataValidation(data: number): void {
    const entityValidator = new EntityValidator();
    const errorMessages = entityValidator.isFieldValid(data, [
      new NotNullValidator('Id cannot be null'),
      new NumberValidator('Id is not a number'),
    ]);

    if (errorMessages == null) return;
    throw new CustomError({
      from: 'GetUserExecutorService',
      status: HttpStatus.BAD_REQUEST,
      error: errorMessages,
    });
  }

  dataRetrieving(): any {
    console.log('Not used in this case');
  }

  dataDomain(): void {
    console.log('Not used in this case');
  }

  async dataProcessing(id: number): Promise<UserEntity> {
    const queryResponse: any[] = await this.connection.query(
      'SELECT',
      'users',
      id,
      'document',
    );

    if (queryResponse) {
      return new UserEntity(queryResponse);
    }

    throw new CustomError({
      from: 'GetUserExecutor',
      status: HttpStatus.NOT_FOUND,
      error: 'User not found',
    });
  }

  public async execute(params: number): Promise<UserEntity> {
    try {
      this.connection = await this._dbService.getPool();
      this.dataValidation(params);
      this.dataRetrieving();
      return await this.dataProcessing(params);
    } catch (e) {
      // Close cache
      await this._dbService.closeConnection();
      throw e;
    }
  }

  constructor(private _dbService: DbService) {
    super();
  }
}
