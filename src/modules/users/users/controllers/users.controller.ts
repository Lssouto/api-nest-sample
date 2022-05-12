import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomError } from 'src/helpers/error.helper';
import {
  ResponseDTO,
  ResponseErrorDTO,
} from 'src/services/response-factory/dto/response-factory.dto';
import { ResponseFactoryService } from 'src/services/response-factory/response-factory.service';
import { UserEntity, UserDTO } from '../entity/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  /**
   * O endpoint mais simples possível
   */
  @Get()
  async getAllUsers() {
    try {
      return await this._userService.getUsers();
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  @ApiResponse({
    type: ResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    type: ResponseErrorDTO,
  })
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this._userService.getUser(id);
      if (user) {
        res
          .status(HttpStatus.OK)
          .send(this._responseFactory.createResponse('OK', user));
        return;
      }

      throw new CustomError({
        from: 'UserController',
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      });
    } catch (e) {
      const error = this._responseFactory.createResponseError(e);
      res.status(error.status).send(error.response);
    }
  }

  @Post()
  @ApiResponse({
    type: ResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    type: ResponseErrorDTO,
  })
  async addUser(@Res() res: Response, @Body() body: UserDTO) {
    try {
      const userEntity: UserEntity = new UserEntity(body, true);
      await this._userService.addUser(userEntity);
      res
        .status(HttpStatus.CREATED)
        .send(
          this._responseFactory.createResponse(
            'succeeded persisted the data',
            null,
          ),
        );
    } catch (e) {
      const error = this._responseFactory.createResponseError(e);
      res.status(error.status).send(error.response);
    }
  }

  constructor(
    private _userService: UsersService,
    private _responseFactory: ResponseFactoryService,
  ) {}
}
