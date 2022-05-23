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
import {
  ResponseDTO,
  ResponseErrorDTO,
} from 'src/services/response-factory/dto/response-factory.dto';
import { ResponseFactoryService } from 'src/services/response-factory/response-factory.service';
import { UserDTO } from '../entity/user.entity';
import { AddUserExecutorService } from '../services/add-user-executor/add-user-executor.service';
import { GetUserExecutorService } from '../services/get-user-executor/get-user-executor.service';
import { GetUsersExecutorService } from '../services/get-users-executor/get-users-executor.service';

@Controller('users')
export class UsersController {
  /**
   * O endpoint mais simples possível
   */
  @Get()
  @ApiResponse({
    type: ResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    type: ResponseErrorDTO,
  })
  async getAllUsers(@Res() res: Response) {
    try {
      return res
        .status(200)
        .send(
          this._responseFactory.createResponse(
            'Ok',
            await this._getUsersExecutor.execute(),
          ),
        );
    } catch (e) {
      const error = this._responseFactory.createResponseError(e);
      res.status(error.status).send(error.response);
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
      return res
        .status(200)
        .send(
          this._responseFactory.createResponse(
            'Ok',
            await this._getUserExecutor.execute(id),
          ),
        );
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
      await this._addUserExecutor.execute(body);

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
    private _responseFactory: ResponseFactoryService,
    private _addUserExecutor: AddUserExecutorService,
    private _getUserExecutor: GetUserExecutorService,
    private _getUsersExecutor: GetUsersExecutorService,
  ) {}
}
