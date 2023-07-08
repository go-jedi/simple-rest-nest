import { Injectable } from '@nestjs/common';

import { CreateRoleBodyDto, CreateRoleResponse } from './dto/create-role.dto';
import {
  GetRoleByValueBodyDto,
  GetRoleByValueResponse,
} from './dto/get-role-by-value.dto';

import db from '../db';

@Injectable()
export class RolesService {
  async createRole(dto: CreateRoleBodyDto): Promise<CreateRoleResponse> {
    const newRole = await db.query('SELECT role_create($1)', [dto]);
    if (newRole.rows[0].role_create === true) {
      return {
        status: 200,
        message: 'успешное создание роли',
        result: newRole.rows[0].role_create,
      };
    }
  }

  async getRoleByValue(
    dto: GetRoleByValueBodyDto,
  ): Promise<GetRoleByValueResponse> {
    const role = await db.query('SELECT role_get_by_value($1)', [dto]);
    if (role.rows.length > 0) {
      return {
        status: 200,
        message: 'успешное получение роли',
        result: role.rows[0].role_get_by_value,
      };
    }
  }
}
