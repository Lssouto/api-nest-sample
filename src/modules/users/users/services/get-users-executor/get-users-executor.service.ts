import { Injectable } from '@nestjs/common';
import { ServiceExecutor } from 'src/model/service-executor.model';
import { DbService } from 'src/services/db/db.service';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class GetUsersExecutorService extends ServiceExecutor {
  protected dataValidation(): void {
    console.log('Not used in this case');
  }

  protected dataRetrieving(): any {
    console.log('Not used in this case');
  }

  protected dataDomain(): void {
    console.log('Not used in this case');
  }

  protected async dataProcessing(): Promise<UserEntity[]> {
    const queryResponse: any[] = await this.connection.query(
      'SELECT',
      'users',
      null,
    );

    const formattedQueryResponse = queryResponse.map(
      (response) => new UserEntity(response, false),
    );

    return formattedQueryResponse;
  }

  public async execute(): Promise<UserEntity[]> {
    try {
      this.connection = await this._dbService.getPool();
      return await this.dataProcessing();
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
