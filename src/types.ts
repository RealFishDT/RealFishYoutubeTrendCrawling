export interface VideoTrendFeedInfo {
  videoId: string;
  thumbnail?: string;
  title: string;
  channelId: string;
  rank: number;
  viewCountText: string;
  type: 'shorts' | 'video';
}

export type VideoTrendFeedInfos = VideoTrendFeedInfo[];

export enum CrawlingErrorCode {
  Normal,
  PlayerResponse,
  InitalData,
  InitalContinueData,
  Unknown,
}

export class CrawlingError extends Error {
  code: CrawlingErrorCode;
  name = '';
  constructor(code: CrawlingErrorCode, message?: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }
}
