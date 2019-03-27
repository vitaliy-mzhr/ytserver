import { Injectable } from '@nestjs/common';
import { MemStorageService } from '../commons/mem-storage.service';
import { Video } from './video';

@Injectable()
export class VideosUtils {

  constructor(
    private readonly memStorage: MemStorageService,
  ) {}

  /**
   * Sets isFavourite flag in videos in given array for a given user (by sessionId)
   * @param {Video[]} videos
   * @param {string} sessionId
   * @returns {Video[]}
   */
  public setIsFavouriteFlags(videos: Video[], sessionId: string): Video[] {
    const videoIds = this.memStorage.take(sessionId);
    return videos.map(video => {
      const inFavourites = videoIds.includes(video.id);
      if (inFavourites) {
        video.isFavourite = true;
      }
      return video;
    });
  }

}
