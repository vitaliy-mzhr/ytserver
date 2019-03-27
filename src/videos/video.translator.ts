import { Injectable } from '@nestjs/common';
import { Video } from './video';

@Injectable()
export class VideoTranslator {

  /**
   * Translates youtube search video response into Video object for internal use
   * @param youtubeSnippetResource
   * @returns {Video}
   */
  public translate(youtubeSnippetResource: any): Video {
    const res = youtubeSnippetResource;
    const video = new Video();
    video.id = typeof res.id === 'string' ? res.id : res.id.videoId;
    video.publishedAt = res.snippet.publishedAt;
    video.title = res.snippet.title;
    video.description = res.snippet.description;
    video.thumbs = {
      small: res.snippet.thumbnails.default.url,
      medium: res.snippet.thumbnails.medium.url,
      large: res.snippet.thumbnails.high.url,
    };
    video.isFavourite = false;
    return video;
  }

}