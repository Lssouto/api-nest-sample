import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtTranslateMiddleware } from 'src/middlewares/jwt-translate.middleware';
import { DbService } from 'src/services/db/db.service';
import { ResponseFactoryService } from 'src/services/response-factory/response-factory.service';
import { UsersController } from './users/controllers/users.controller';
import { AddUserExecutorService } from './users/services/add-user-executor/add-user-executor.service';
import { GetUserExecutorService } from './users/services/get-user-executor/get-user-executor.service';
import { GetUsersExecutorService } from './users/services/get-users-executor/get-users-executor.service';

@Module({
  controllers: [UsersController],
  providers: [
    DbService,
    ResponseFactoryService,
    AddUserExecutorService,
    GetUserExecutorService,
    GetUsersExecutorService,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtTranslateMiddleware).forRoutes(UsersController);
  }
}
