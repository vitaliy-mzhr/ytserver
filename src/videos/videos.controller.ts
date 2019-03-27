import {
  Body,
  Controller,
  Get, HttpCode, HttpStatus,
  InternalServerErrorException,
  Param, Patch,
  Query,
  Req,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { MemStorageService } from '../commons/mem-storage.service';
import { Video } from './video';

@Controller('videos')
export class VideosController {

  constructor(
    private readonly videosService: VideosService,
    private readonly memStorage: MemStorageService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public updateVideo(@Param('id') videoId: string, @Body() body, @Req() req): void {
    if (body.isFavourite) {
      this.memStorage.putUnique(req.sessionID, videoId);
    } else {
      this.memStorage.remove(req.sessionID, videoId);
    }
    return;
  }

  @Get('search')
  public searchVideos(@Query('query') query: string, @Req() req): Promise<Video[]> {
    return this.videosService.search(query, req.sessionID)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  @Get('favourites')
  public findStarredVideos(@Req() req): Promise<Video[]> {
    const videoIds = this.memStorage.take(req.sessionID);
    return this.videosService.findByIds(videoIds, req.sessionID)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

}
