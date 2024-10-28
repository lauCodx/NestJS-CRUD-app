import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enum/roles.enum";

@Schema({timestamps:true})
export class User {
  @Prop({required:true})
  name:string;

  @Prop({required:true, unique:true, lowercase:true})
  email:string;

  @Prop({required:true})
  password:string;

  @Prop({type:String, enum: Role, default: Role.User})
  role: Role;
}

export const UserShema = SchemaFactory.createForClass(User)