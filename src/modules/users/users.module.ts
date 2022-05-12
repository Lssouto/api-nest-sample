import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtTranslateMiddleware } from 'src/middlewares/jwt-translate.middleware';
import { DbService } from 'src/services/db/db.service';
import { ResponseFactoryService } from 'src/services/response-factory/response-factory.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbService, ResponseFactoryService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtTranslateMiddleware).forRoutes(UsersController);
  }
}
