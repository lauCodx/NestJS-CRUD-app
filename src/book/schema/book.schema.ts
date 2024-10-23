import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";


@Schema({timestamps: true})
export class Book extends Document {

    @Prop({required: true, unique: true, maxlength:50, lowercase:true})
    titile: string;

    @Prop({required:false, maxlength:50})

    @Prop({required: false, maxlength: 500})
    description: string

    @Prop({type: MongooseSchema.Types.ObjectId, required: true, ref:'User' })
    createdBy: MongooseSchema.Types.ObjectId

}

export const BookSchema = SchemaFactory.createForClass(Book)