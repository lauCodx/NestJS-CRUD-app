import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUpDto';
import { SigninDto } from './dto/signInDto';
import { refreshTokenDto } from './dto/refreshTokenDto';


@Controller('auth')
export class AuthController {
  constructor(private authUserService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authUserService.signup(signUpDto);
  }

  @Post('signIn')
  async signIn(@Body() signInDto: SigninDto) {
    return this.authUserService.signin(signInDto);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: refreshTokenDto) {
    return this.authUserService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Get()
  protectedRoute(@Req() req) {
    return { message: 'This route is protected', user: req.email };
  }
}
