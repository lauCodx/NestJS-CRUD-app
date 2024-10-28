import { CanActivate, ExecutionContext, Injectable, } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


@Injectable()
export class RolesGuard implements CanActivate  {

    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        return false
    }
}