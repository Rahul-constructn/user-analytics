import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Page } from "./page.schema";


@Schema()

export class Project{

    @Prop()
    project_name:string;

    @Prop()
    location:[Number];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }] })
    page:Page[]
}

export const ProjectSchema=SchemaFactory.createForClass(Project)