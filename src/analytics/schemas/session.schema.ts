import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

 

@Schema()
export class Session{

   @Prop()
   user:String;
   @Prop()
   project:String;
   @Prop()
   page:String;
   @Prop()
   start_time:Date;
   @Prop()
   end_time:Date;
   @Prop()
   device:String;
   @Prop()
   timeSpent:string;
   

}

export const SessionSchema=SchemaFactory.createForClass(Session)