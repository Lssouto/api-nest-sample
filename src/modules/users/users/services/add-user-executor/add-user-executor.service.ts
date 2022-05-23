import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/helpers/error.helper';
import { ServiceExecutor } from 'src/model/service-executor.model';
import { DbService } from 'src/services/db/db.service';
import { UserDTO, UserEntity } from '../../entity/user.entity';

@Injectable()
export class AddUserExecutorService extends ServiceExecutor {
  dataValidation(data): UserEntity {
    return new UserEntity(data, true);
  }

  dataRetrieving(): any {
    console.log('Not used in this case');
  }

  async dataDomain(user: UserEntity): Promise<void> {
    const foundUser = await this.connection.query(
      'SELECT',
      'users',
      user.document,
      'document',
    );

    if (foundUser) {
      throw new CustomError({
        status: 400,
        from: 'AddUserExecutor',
        error: 'User already in database',
      });
    }
  }

  async dataProcessing(user: UserEntity): Promise<void> {
    await this.connection.query('INSERT', 'users', user);
  }

  public async execute(params: UserDTO): Promise<boolean> {
    try {
      this.connection = await this._dbService.getPool();
      const user = this.dataValidation(params);
      this.dataRetrieving();
      await this.dataDomain(user);
      await this.dataProcessing(user);
      return true;
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
