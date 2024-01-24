import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps:true
})
export class User extends Document{
    @Prop()
    name: string;
  
    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    @Prop()
    status:Status;
  
    @Prop()
    password: string;
  }

  enum Status{
    active,
    inactive
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);