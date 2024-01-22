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
   start_time:String;
   @Prop()
   end_time:String;
   @Prop()
   device:String;

      


}

export const SessionSchema=SchemaFactory.createForClass(Session)
