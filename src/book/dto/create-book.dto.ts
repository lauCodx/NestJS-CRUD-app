import { IsLowercase, IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @IsLowercase()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    description?: string

    @IsMongoId()
    @IsNotEmpty()
    createdBy: string
}
