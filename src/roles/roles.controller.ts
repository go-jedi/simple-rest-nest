import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleBodyDto, CreateRoleResponse } from './dto/create-role.dto';
import {
  GetRoleByValueBodyDto,
  GetRoleByValueResponse,
} from './dto/get-role-by-value.dto';
import { AddRoleBodyDto, AddRoleResponse } from './dto/add-role.dto';

@ApiTags('Роли')
@Controller('api-v1/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: CreateRoleResponse })
  @Post('create-role')
  createRole(@Body() roleDto: CreateRoleBodyDto): Promise<CreateRoleResponse> {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение роли по названию' })
  @ApiResponse({ status: 200, type: GetRoleByValueResponse })
  @Post('get-role-by-value')
  getRoleByValue(
    @Body() roleDto: GetRoleByValueBodyDto,
  ): Promise<GetRoleByValueResponse> {
    return this.rolesService.getRoleByValue(roleDto);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200, type: AddRoleResponse })
  @Post('add-role')
  addRole(@Body() roleDto: AddRoleBodyDto): Promise<AddRoleResponse> {
    return this.rolesService.addRole(roleDto);
  }
}
