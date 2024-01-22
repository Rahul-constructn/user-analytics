import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Project } from "./project.schema";


@Schema()

export class Page{
    @Prop()
    page_name:string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project'  })
    projectId:Project;
}

export const PageSchema=SchemaFactory.createForClass(Page)