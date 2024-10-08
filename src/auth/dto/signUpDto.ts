import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, ValidateIf } from "class-validator";

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(5)
    @Matches(/^(?=.*[0-9])/, {message:"Password must contain atleast one number"})
    password: string;

    @IsString()
    @MinLength(5)
    @ValidateIf((o) => o.password)
    confirmPassword:string
}
