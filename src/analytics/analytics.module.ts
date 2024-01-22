import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session,SessionSchema } from './schemas/session.schema';


@Module({
  imports:[MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
