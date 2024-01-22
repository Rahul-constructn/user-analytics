import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin1:admin1@demo.ntnzqgx.mongodb.net/userAnalytics?retryWrites=true&w=majority'),AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
