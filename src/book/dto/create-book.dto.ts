import {  IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    description?: string

}
