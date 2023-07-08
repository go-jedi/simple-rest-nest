import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserBodyDto, CreateUserResponse } from './dto/create-user.dto';
import { GetAllUsersResponse } from './dto/get-all-users.dto';

@ApiTags('Пользователи')
@Controller('api-v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: CreateUserResponse })
  @Post()
  create(@Body() userDto: CreateUserBodyDto): Promise<CreateUserResponse> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: GetAllUsersResponse })
  @Get()
  getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAllUsers();
  }
}
