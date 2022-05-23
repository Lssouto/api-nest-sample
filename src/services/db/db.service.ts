import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  public queryEnumMocker = {
    users: [],
  };

  public async getPool(): Promise<DbService> {
    return new Promise((res) => {
      res(this);
    });
  }
  public async query(
    query: string,
    from: string,
    value: any,
    field?: string,
  ): Promise<any> {
    return new Promise((res) => {
      switch (query) {
        case 'SELECT':
          if (value) {
            res(
              this.queryEnumMocker[from].find((item) => item[field] == value),
            );
          }
          res(this.queryEnumMocker[from]);
          break;
        case 'INSERT':
          if (this.queryEnumMocker[from] == null) {
            this.queryEnumMocker[from] = [];
          }
          this.queryEnumMocker[from].push(value);
          res(true);
          break;

        default:
          res(null);
      }
    });
  }

  public async closeConnection() {
    return new Promise((res) => {
      res(this);
    });
  }
}
