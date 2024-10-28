import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateIf } from "class-validator";
import { Role } from "../enum/roles.enum";

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/^(?=.*[0-9])/, {message:"Password must contain atleast one number"})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ValidateIf((o) => o.password)
    confirmPassword:string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role
}
