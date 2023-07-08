import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRoleBodyDto {
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  @IsNumber({}, { message: 'Поле userId должно быть числом' })
  readonly userId: number;
  @ApiProperty({
    example: 2,
    description: 'Id роли',
  })
  @IsNumber({}, { message: 'Поле roleId должно быть числом' })
  readonly roleId: number;
}

export class AddRoleResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'успешное добавление роли для пользователя',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example: true,
    description: 'Результат',
  })
  readonly result: boolean;
}
