import { VideoThumb } from './video-thumb';

export class Video {
  public id: string;
  public publishedAt: string;
  public title: string;
  public description: string;
  public thumbs: VideoThumb;
  public isFavourite: boolean;
}
