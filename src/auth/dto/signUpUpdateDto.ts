import { PartialType } from "@nestjs/mapped-types"
import { SignUpDto } from "./signUpDto"

export class UpdateSignUpDto extends PartialType (SignUpDto){}