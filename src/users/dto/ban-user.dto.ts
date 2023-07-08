import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BanUserBodyDto {
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  @IsNumber({}, { message: 'Поле userId должно быть числом' })
  readonly userId: number;
}

export class BanUserResponse {
  @ApiProperty({
    examples: [200, 400, 500],
    description: 'Статус код',
  })
  readonly status: number;
  @ApiProperty({
    example: 'пользователь успешно забанен',
    description: 'Сообщение',
  })
  readonly message: string;
  @ApiProperty({
    example: true,
    description: 'Результат',
  })
  readonly result: boolean;
}
