import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { AuthUser } from "../interface/user.interface";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req:AuthUser = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req)

        if(!token){
            throw new UnauthorizedException("Invalid Token or no Token provided!")
        };
        try {

            const decoded = this.jwtService.verify(token)
            req.user = decoded
            
        } catch (error) {
            Logger.error(error.message)
            throw new UnauthorizedException('Invalid Token')
        }
        return true
    }

    private extractTokenFromHeader (req:Request): string | undefined {
        return req.headers.authorization.split(' ')[1];
    }
}