import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";


@Schema({timestamps: true})
export class Book extends Document {

    @Prop({required: true, unique: true})
    titile: string;

    @Prop({required: false})
    description: string

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref:'User' })
    createdBy: MongooseSchema.Types.ObjectId

}

export const BookSchema = SchemaFactory.createForClass(Book)