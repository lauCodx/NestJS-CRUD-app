import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Role } from "../enum/roles.enum";

@Schema({timestamps: true, versionKey: false})
export class RefreshToken extends Document{
    @Prop({required: true})
    token: string;

    @Prop({required: true, type: mongoose.Types.ObjectId})
    userId: mongoose.Types.ObjectId;

    @Prop({required:false})
    email:string;

    @Prop({required: false })
    role: Role

    @Prop({required: true})
    expiryDate: Date


}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)