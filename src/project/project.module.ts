import { Module } from '@nestjs/common';
import { PageService, ProjectService } from './project.service';
import { PageController, ProjectController } from './project.controller';
import { Project, ProjectSchema} from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Page,PageSchema } from './schemas/page.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema },{ name: Page.name, schema: PageSchema }])],
  controllers: [ProjectController,PageController],
  providers: [ProjectService,PageService],
})
export class ProjectModule {}
