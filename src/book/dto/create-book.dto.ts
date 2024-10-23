import { IsLowercase, IsMongoId, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @IsLowercase()
    title: string;

    @IsString()
    author: string;

    @IsString()
    @MaxLength(500)
    description?: string

    @IsMongoId()
    @IsNotEmpty()
    createdBy: string
}
