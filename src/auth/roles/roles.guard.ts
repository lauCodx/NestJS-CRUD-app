import { CanActivate, ExecutionContext, ForbiddenException, Injectable, } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enum/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorators";
import { AuthUser } from "src/interface/user.interface";


@Injectable()
export class RolesGuard implements CanActivate  {

    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(!requiredRoles){
            return true
        };

        const {user} = context.switchToHttp().getRequest<AuthUser>();
        if (!requiredRoles.includes(user.role)){
            throw new ForbiddenException("Not permitted!")
        }
        return true
    }
}