import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleBodyDto {
  @ApiProperty({
    example: 'admin',
    description: 'Название роли',
  })
  @IsString({ message: 'Поле value должно быть строкой' })
  readonly value: string;
  @ApiProperty({
    example: 'администратор',
    description: 'Описание роли',
  })
  @IsString({ message: 'Поле description должно быть строкой' })
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
