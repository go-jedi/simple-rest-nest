import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserBodyDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Поле email должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  @ApiProperty({
    example: '123456789',
    description: 'Пароль',
  })
  @IsString({ message: 'Поле password должно быть строкой' })
  @Length(4, 16, {
    message: 'Поле password должно быть не меньше 4 и не больше 16',
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
