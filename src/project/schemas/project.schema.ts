import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { User } from "src/auth/schemas/user.schema";


@Schema()

export class Project{

    @Prop()
    project_name:string;

    @Prop()
    location:[Number];

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    // user:User
    @Prop()
    user:string;
}

export const ProjectSchema=SchemaFactory.createForClass(Project)