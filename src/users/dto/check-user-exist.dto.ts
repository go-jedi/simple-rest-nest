import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckUserExistBodyDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Поле email должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
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
