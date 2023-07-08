import { HttpStatus, Injectable } from '@nestjs/common';

import {
  CheckUserExistBodyDto,
  CheckUserExistResponse,
} from './dto/check-user-exist.dto';
import { CreateUserBodyDto, CreateUserResponse } from './dto/create-user.dto';
import { GetAllUsersResponse } from './dto/get-all-users.dto';

import db from '../db';
import { AddRoleBodyDto } from '../roles/dto/add-role.dto';
import { BanUserBodyDto, BanUserResponse } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  async checkUserExist(
    dto: CheckUserExistBodyDto,
  ): Promise<CheckUserExistResponse> {
    const userExist = await db.query('SELECT user_check_exist($1)', [dto]);
    if (userExist.rows[0].user_check_exist === true) {
      return {
        status: HttpStatus.OK,
        message: 'пользователь уже существует',
        result: userExist.rows[0].user_check_exist,
      };
    }
    if (userExist.rows[0].user_check_exist === false) {
      return {
        status: HttpStatus.OK,
        message: 'пользователь не существует',
        result: userExist.rows[0].user_check_exist,
      };
    }
  }

  async createUser(dto: CreateUserBodyDto): Promise<CreateUserResponse> {
    const uid = await db.query('SELECT uid($1)', [10]);
    if (uid.rows.length > 0) {
      const newUser = await db.query('SELECT user_create($1, $2)', [
        dto,
        uid.rows[0].uid,
      ]);
      if (newUser.rows[0].user_create === true) {
        return {
          status: HttpStatus.OK,
          message: 'успешное создание пользователя',
          result: newUser.rows[0].user_create,
        };
      }
    }
  }

  async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await db.query('SELECT user_get_all()');
    if (users.rows.length > 0) {
      return {
        status: HttpStatus.OK,
        message: 'успешное получение пользователей',
        result: users.rows[0].user_get_all,
      };
    }
  }

  async banUser(dto: BanUserBodyDto): Promise<BanUserResponse> {
    const banUserQuery = await db.query('SELECT admin_ban_user($1)', [dto]);
    if (banUserQuery.rows[0].admin_ban_user === true) {
      return {
        status: HttpStatus.OK,
        message: 'пользователь успешно забанен',
        result: banUserQuery.rows[0].admin_ban_user,
      };
    }
  }
}
