import { Injectable } from '@nestjs/common';
import { VideoTranslator } from './video.translator';
import { google } from 'googleapis';
import { VideosUtils } from './videos.utils';
import { Video } from './video';

@Injectable()
export class VideosService {

  private maxSearchResults: number;
  private youtube: any;

  constructor(
    private readonly videoTranslator: VideoTranslator,
    private readonly videosUtils: VideosUtils,
  ) {
    this.maxSearchResults = 20;
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  /**
   * Searches YouTube videos by a given query
   * @param {string} query
   * @param {string} sessionId
   * @returns {Promise<any>}
   */
  public async search(query: string, sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: query,
        maxResults: this.maxSearchResults,
      }, (err, data) => {
        if (err) { return reject(err); }
        const videos = this.translateSnippetResponse(data, sessionId);
        return resolve(videos);
      });
    });
  }

  /**
   * Finds YouTube videos by given ids
   * @param {string[]} ids - YouTube video ids
   * @param {string} sessionId
   * @returns {Promise<any>}
   */
  public async findByIds(ids: string[], sessionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.youtube.videos.list({
        part: 'snippet',
        type: 'video',
        id: ids.join(','),
      }, (err, data) => {
        if (err) { return reject(err); }
        const videos = this.translateSnippetResponse(data, sessionId);
        return resolve(videos);
      });
    });
  }

  /**
   * Translates YouTube search raw response to an array of Video objects
   * @param data - YouTube search raw response
   * @param {string} sessionId
   * @Returns {Video[]}
   */
  private translateSnippetResponse(data: any, sessionId: string): Video[] {
    let videos = data.data.items.map(snippet => this.videoTranslator.translate(snippet));
    return this.videosUtils.setIsFavouriteFlags(videos, sessionId);
  }

}
