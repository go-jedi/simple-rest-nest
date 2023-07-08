import { ApiProperty } from '@nestjs/swagger';

export class CheckUserExistBodyDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Электронная почта',
  })
  readonly email: string;
}

export class CheckUserExistResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    examples: ['пользователь уже существует', 'пользователь не существует'],
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    examples: [true, false],
    description: 'Результат',
  })
  readonly result: boolean;
}
