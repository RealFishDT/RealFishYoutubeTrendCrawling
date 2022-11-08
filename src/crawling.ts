import axios from 'axios';
import * as Types from './types';
export class TrendVideoCrawler {
  private gl = 'KR';
  private hl = 'KO';
  constructor(gl = 'KR', hl = 'KO') {
    this.gl = gl;
    this.hl = hl;
  }
  private async getHtml(gl: string, hl: string) {
    try {
      return await axios.get(
        `https://www.youtube.com/feed/trending?gl=${gl}&hl=${hl}`
      );
    } catch (error) {
      throw new Types.CrawlingError(Types.CrawlingErrorCode.Unknown);
    }
  }

  private analizeYoutubeTrendFeed(data: string) {
    try {
      const regexObj = new RegExp('ytInitialData = ({.*?});', 's');
      const playerInfoMatch = regexObj.exec(data);
      const ytInitialData = JSON.parse(playerInfoMatch[1]);
      const tabs: any[] =
        ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs;

      const trendTabs = tabs.filter(tab => tab.tabRenderer.selected);
      let renderSectionContents = [];
      if (trendTabs && trendTabs.length > 0) {
        const trendTab = trendTabs.find(item => {
          if (item.tabRenderer) {
            return (
              item.tabRenderer.title &&
              (item.tabRenderer.title.toLowerCase() === 'now' ||
                item.tabRenderer.title === '최신')
            );
          }
        });
        const contentSectionRenderer =
          trendTab.tabRenderer.content.sectionListRenderer;

        if (contentSectionRenderer && contentSectionRenderer.contents) {
          renderSectionContents = contentSectionRenderer.contents;
        }
      } else {
        throw new Types.CrawlingError(Types.CrawlingErrorCode.Unknown);
      }

      const videoRanks: Types.VideoTrendFeedInfos = [];
      let videoRankNumber = 1;
      let shortsRankNumber = 1;
      for (const section of renderSectionContents) {
        const contents = section.itemSectionRenderer.contents[0];
        const type = contents.shelfRenderer.content
          .expandedShelfContentsRenderer
          ? 'expandedShelfContentsRenderer'
          : contents.shelfRenderer.content.horizontalListRenderer
          ? 'horizontalListRenderer' // this case is shorts
          : null;
        if (type === 'expandedShelfContentsRenderer') {
          const items =
            contents.shelfRenderer.content.expandedShelfContentsRenderer.items;
          for (const item of items) {
            const result: Types.VideoTrendFeedInfo = {
              videoId: item.videoRenderer.videoId,
              thumbnail: item.videoRenderer.thumbnail.thumbnails[0].url,
              title: item.videoRenderer.title.runs[0].text,
              channelId:
                item.videoRenderer.ownerText.runs[0].navigationEndpoint
                  .browseEndpoint.browseId,
              rank: videoRankNumber,
              type: 'video',
            };
            videoRankNumber += 1;
            videoRanks.push(result);
          }
        }
        if (type === 'horizontalListRenderer') {
          // shorts case
          const items =
            contents.shelfRenderer.content.horizontalListRenderer.items;
          for (const item of items) {
            const result: Types.VideoTrendFeedInfo = {
              videoId: item.gridVideoRenderer.videoId,
              thumbnail: item.gridVideoRenderer.thumbnail.thumbnails[0].url,
              title: item.gridVideoRenderer.title.runs[0].text,
              channelId:
                item.gridVideoRenderer.shortBylineText.runs[0]
                  .navigationEndpoint.browseEndpoint.browseId,
              rank: shortsRankNumber,
              type: 'shorts',
            };
            shortsRankNumber += 1;
            videoRanks.push(result);
          }
        }
      }
      return videoRanks;
    } catch (e) {
      throw new Types.CrawlingError(Types.CrawlingErrorCode.InitalData);
    }
  }

  public async execute(): Promise<Types.VideoTrendFeedInfos | null> {
    const result = await this.getHtml(this.gl, this.hl);
    if (result) {
      const initYoutubeInfo = this.analizeYoutubeTrendFeed(result.data);
      return initYoutubeInfo;
    }
    return null;
  }
}

export default TrendVideoCrawler;
