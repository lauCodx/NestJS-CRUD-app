import {Request} from 'express'

interface UserInterface{
    _id: string;
    email:string;

}

export interface AuthUser extends Request{
    user?: UserInterface
}