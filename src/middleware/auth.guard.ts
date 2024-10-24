import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthUser } from '../interface/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: AuthUser = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {

    const authHeader = req.headers.authorization
    if(!authHeader) {
      Logger.error('Authorization header missing')
      throw new UnauthorizedException('No Authorization found ')
    }
    return authHeader.split(' ')[1];
  }
}
