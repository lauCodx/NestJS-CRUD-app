import {Body, Controller, HttpException, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { SigninDto } from './dto/signInDto';


@Controller('auth')
export class AuthController {
  constructor(private authUserService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto:SignUpDto){
    return this.authUserService.signup(signUpDto)
  }

  @Post('signIn')
  async signIn (@Body() signInDto:SigninDto){
    return this.authUserService.signin(signInDto)
  }
}

