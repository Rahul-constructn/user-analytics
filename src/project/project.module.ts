import { AnalyticsModule } from 'src/analytics/analytics.module';
import { Module } from '@nestjs/common';
import { PageService, ProjectService } from './project.service';
import { PageController, ProjectController } from './project.controller';
import { Project, ProjectSchema} from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Page,PageSchema } from './schemas/page.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Session, SessionSchema } from 'src/analytics/schemas/session.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema },{ name: Page.name, schema: PageSchema },{ name: Session.name, schema: SessionSchema }]),AuthModule,AnalyticsModule],
  controllers: [ProjectController,PageController],
  providers: [ProjectService,PageService],
})
export class ProjectModule {}
