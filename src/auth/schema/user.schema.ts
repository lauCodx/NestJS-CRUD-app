import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class User {
  @Prop({required:true})
  name:string;

  @Prop({required:true, unique:true, lowercase:true})
  email:string;

  @Prop({required:true})
  password:string;
}

export const UserShema = SchemaFactory.createForClass(User)