import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
  @ApiProperty({
    description: 'response data',
  })
  data: T;

  @ApiProperty({
    description: 'response message',
    type: String,
    example: 'success',
  })
  message: string = 'success';

  count: number;
}
