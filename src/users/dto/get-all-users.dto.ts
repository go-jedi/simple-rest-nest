import { ApiProperty } from '@nestjs/swagger';

interface getAllUsersResult {
  id: number;
  uid: string;
  email: string;
  password: string;
  banned: boolean;
  banReason: string;
  created: string;
}

export class GetAllUsersResponse {
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
    example: [
      {
        id: 1,
        uid: 'hvldtApwXn',
        email: 'test@gmail.com',
        banned: false,
        created: '2023-07-08T01:15:49.592057',
        password: '123456789',
        banreason: '',
      },
    ],
    description: 'Результат',
  })
  readonly result: getAllUsersResult[];
}
