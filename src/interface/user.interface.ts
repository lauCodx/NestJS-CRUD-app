import {Request} from 'express'
import { Role } from 'src/auth/enum/roles.enum';

interface UserInterface{
    _id: string;
    email:string;
    role:Role

}

export interface AuthUser extends Request{
    user?: UserInterface
}