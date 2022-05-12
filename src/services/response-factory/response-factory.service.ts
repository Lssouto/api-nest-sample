import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/helpers/error.helper';
import { ResponseDTO } from './dto/response-factory.dto';

@Injectable()
export class ResponseFactoryService {
  createResponse(message: string, body: { [key: string]: any }): ResponseDTO {
    const response = {
      message,
      body,
      id: {
        correlation_id: '1A2B3C',
      },
    };
    console.log(`:: Response, ${JSON.stringify(response)}`);
    return response;
  }

  createResponseError(error: unknown | CustomError): {
    status: number;
    response: ResponseDTO;
  } {
    return !(error instanceof CustomError)
      ? this._getGenericErrorResponse(error)
      : this._getCustomErrorResponse(error);
  }

  /**
   * TODO: Extrair em classes e abstrair
   */
  private _getGenericErrorResponse(error: any) {
    console.log(`:: Internal server error : ${error}`);
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      response: {
        message: 'An unepexted error occurred',
        body: null,
        id: {
          correlation_id: '',
        },
      },
    };
  }

  /**
   * TODO: Extrair em classes e abstrair
   */
  private _getCustomErrorResponse(error: CustomError) {
    console.log(
      `:: Response Error from '${error.from}': '${
        error.error
      }': ${JSON.stringify(error)}`,
    );
    delete error.from;
    return {
      status: error.status,
      response: {
        message: error.error,
        body: null,
        id: {
          correlation_id: '',
        },
      },
    };
  }
}
