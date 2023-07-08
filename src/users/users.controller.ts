import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  CheckUserExistBodyDto,
  CheckUserExistResponse,
} from './dto/check-user-exist.dto';
import { CreateUserBodyDto, CreateUserResponse } from './dto/create-user.dto';
import { GetAllUsersResponse } from './dto/get-all-users.dto';

@ApiTags('Пользователи')
@Controller('api-v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Проверить существование пользователя' })
  @ApiResponse({ status: 200, type: CheckUserExistResponse })
  @Post('check-exist')
  checkUserExist(
    @Body() userDto: CheckUserExistBodyDto,
  ): Promise<CheckUserExistResponse> {
    return this.usersService.checkUserExist(userDto);
  }

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
