import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleBodyDto {
  @ApiProperty({
    example: 'admin',
    description: 'Название роли',
  })
  readonly value: string;
  @ApiProperty({
    example: 'администратор',
    description: 'Описание роли',
  })
  readonly description: string;
}

export class CreateRoleResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'успешное создание роли',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example: true,
    description: 'Результат',
  })
  readonly result: boolean;
}
