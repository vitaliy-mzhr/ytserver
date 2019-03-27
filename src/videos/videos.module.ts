import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoTranslator } from './video.translator';
import { VideosUtils } from './videos.utils';

@Module({
  controllers: [
    VideosController,
  ],
  providers: [
    VideosService,
    VideoTranslator,
    VideosUtils,
  ],
})
export class VideosModule {}
