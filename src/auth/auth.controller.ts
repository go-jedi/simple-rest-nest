import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInBodyDto, SignInResponse } from './dto/sign-in.dto';
import { SignUpBodyDto, SignUpResponse } from './dto/sign-up.dto';

@ApiTags('Авторизация')
@Controller('api-v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('sign-in')
  signIn(@Body() authDto: SignInBodyDto): Promise<SignInResponse> {
    return this.authService.signIn(authDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: SignUpResponse })
  @Post('sign-up')
  signUp(@Body() authDto: SignUpBodyDto): Promise<SignUpResponse> {
    return this.authService.signUp(authDto);
  }
}
