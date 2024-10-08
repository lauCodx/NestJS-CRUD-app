import {Body, Controller, HttpException, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';


@Controller('auth')
export class AuthController {
  constructor(private authUserService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto:SignUpDto){
    return this.authUserService.createUser(signUpDto)
  }
}

