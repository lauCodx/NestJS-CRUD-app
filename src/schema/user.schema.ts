import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  
}

export const UserShema = SchemaFactory.createForClass(User)