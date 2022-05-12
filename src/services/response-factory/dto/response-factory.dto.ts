import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({
    description: 'The message from the server',
    example: 'Persisted successfully',
  })
  message: string;

  @ApiProperty({
    description: 'The response body',
    example:
      '{ "users": [{ "name": "Lucas", "age": "25", "document": "12345678909" }] }',
  })
  body: { [key: string]: any };

  @ApiProperty({
    description: 'The id for tracking',
    example: '1A2B3C',
  })
  id: {
    correlation_id: string;
  };
}

export class ResponseErrorDTO extends ResponseDTO {
  @ApiProperty({
    description: 'The message from the server',
    example: 'Failed to persist the data',
  })
  message: string;

  @ApiProperty({
    description: 'The response body',
    example: null,
  })
  body: { [key: string]: any };
}
