import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { AuthUser } from './dto/auth.dto';
import { SignInBodyDto, SignInResponse } from './dto/sign-in.dto';
import { SignUpBodyDto, SignUpResponse } from './dto/sign-up.dto';

import db from '../db';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private async generateToken(user: AuthUser): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: SignInBodyDto): Promise<SignInResponse> {
    const user = await db.query('SELECT user_get_by_email($1)', [
      userDto.email,
    ]);
    if (user.rows[0].user_get_by_email.length === 0) {
      throw new UnauthorizedException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Неправильный email или пароль',
      });
    }
    if (user.rows[0].user_get_by_email.length > 0) {
      const passwordEquals: boolean = await bcrypt.compare(
        userDto.password,
        user.rows[0].user_get_by_email[0].password,
      );
      if (passwordEquals === true) {
        const token: string = await this.generateToken(
          user.rows[0].user_get_by_email[0],
        );
        return {
          status: HttpStatus.OK,
          message: 'успешная авторизация пользователя',
          result: token,
        };
      }
      throw new UnauthorizedException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Неправильный email или пароль',
      });
    }
  }

  async signIn(dto: SignInBodyDto): Promise<SignInResponse> {
    return await this.validateUser(dto);
  }

  async signUp(dto: SignUpBodyDto): Promise<SignUpResponse> {
    const uid = await db.query('SELECT uid($1)', [10]);
    if (uid.rows.length > 0) {
      const hashPassword: string = await bcrypt.hash(dto.password, 5);
      dto.password = hashPassword;
      const newUser = await db.query('SELECT auth_signup($1, $2)', [
        dto,
        uid.rows[0].uid,
      ]);
      if (newUser.rows[0].auth_signup.length > 0) {
        return {
          status: HttpStatus.OK,
          message: 'успешная регистрация пользователя',
          result: true,
        };
      }
    }
  }
}
