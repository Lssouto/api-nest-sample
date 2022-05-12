import { HttpStatus } from '@nestjs/common';
import { CustomError } from 'src/helpers/error.helper';
import {
  EntityValidator,
  GreaterThanValidator,
  NotNullValidator,
} from 'src/helpers/validators.helper';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Fulano da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the user',
    example: '27',
  })
  age: number;

  @ApiProperty({
    description: 'The document number of the user (CPF or CNPJ)',
    example: '12345678909',
  })
  document: number;
}

export class UserEntity extends UserDTO {
  errors?: string[];

  constructor(userParams: unknown, throwOnValidationError = false) {
    super();
    const _validators = {
      name: [new NotNullValidator('Name is not valid')],
      age: [new GreaterThanValidator('Age is not valid', 1)],
      document: [new NotNullValidator('Name is not valid')],
    };
    const _paramsOfTheEntity = Object.keys(_validators);

    this.fillEntity(_paramsOfTheEntity, userParams);

    const errors = new EntityValidator().isEntityValid(
      this,
      _paramsOfTheEntity,
      _validators,
    );

    if (throwOnValidationError && errors.length) {
      throw new CustomError({
        status: HttpStatus.BAD_REQUEST,
        from: 'UserEntity',
        error: `Entity validation error: ${JSON.stringify(errors)}`,
      });
    } else {
      this.errors = errors;
    }

    if (!errors.length) {
      delete this.errors;
    }
  }

  fillEntity(paramsOfTheEntity: string[], userParams: unknown): void {
    paramsOfTheEntity.forEach((param) => {
      const userParamValue = userParams[param];
      this[param] = userParamValue ? userParamValue : null;
    });
  }
}
