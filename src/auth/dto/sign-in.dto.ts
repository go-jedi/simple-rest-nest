import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInBodyDto {
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

export class SignInResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'успешная авторизация пользователя',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiI2dGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODg4MjczMzQsImV4cCI6MTY4ODkxMzczNH0.01_wvvMEQKOS9seRDIyhr7RSPGhlgEaXRmu_U9kZHkE',
    description: 'Результат (токен)',
  })
  readonly result: string;
}
