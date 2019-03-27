import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [VideosModule, CommonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
