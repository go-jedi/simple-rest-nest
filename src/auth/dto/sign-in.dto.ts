import { ApiProperty } from '@nestjs/swagger';

export class SignInBodyDto {
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
