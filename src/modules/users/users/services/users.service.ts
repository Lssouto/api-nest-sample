import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UsersService {
  async getUsers(): Promise<UserEntity[]> {
    const connectionPool = await this._dbService.getPool();
    const queryResponse: any[] = await connectionPool.query(
      'SELECT',
      'users',
      null,
    );
    const formattedQueryResponse = queryResponse.map(
      (response) => new UserEntity(response, false),
    );

    return formattedQueryResponse;
  }

  async getUser(id: number): Promise<UserEntity> {
    const connectionPool = await this._dbService.getPool();
    const queryResponse: any[] = await connectionPool.query(
      'SELECT',
      'users',
      id,
      'document',
    );
    return queryResponse ? new UserEntity(queryResponse) : null;
  }

  async addUser(user: UserEntity) {
    const connectionPool = await this._dbService.getPool();
    await connectionPool.query('INSERT', 'users', user);
  }

  constructor(private _dbService: DbService) {}
}
