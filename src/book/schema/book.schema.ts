import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({timestamps: true})
export class Book extends Document {

    @Prop({required: true, unique: true})
    titile: string;

    @Prop({required: false})
    description: string

    @Prop()
    createdBy: string

}