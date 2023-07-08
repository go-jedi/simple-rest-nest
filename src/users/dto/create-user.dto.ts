import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBodyDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Электронная почта',
  })
  readonly email: string;
  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  readonly password: string;
}

export class CreateUserResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'успешное создание пользователя',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example: true,
    description: 'Результат',
  })
  readonly result: boolean;
}
