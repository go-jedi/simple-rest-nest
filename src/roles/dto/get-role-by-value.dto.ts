import { ApiProperty } from '@nestjs/swagger';

interface getRoleByValueResult {
  id: number;
  value: string;
  description: string;
  created: string;
}

export class GetRoleByValueBodyDto {
  @ApiProperty({
    example: 'admin',
    description: 'Название роли',
  })
  readonly value: string;
}

export class GetRoleByValueResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'успешное получение роли',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example: [
      {
        id: 1,
        value: 'admin',
        created: '2023-07-08T04:20:52.33117',
        description: 'Администратор',
      },
    ],
    description: 'Результат',
  })
  readonly result: getRoleByValueResult[];
}
