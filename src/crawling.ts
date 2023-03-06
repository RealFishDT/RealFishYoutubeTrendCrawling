import axios from 'axios';
import * as Types from './types';
import * as fs from 'fs';

export class TrendVideoCrawler {
    private gl = 'KR';
    private hl = 'KO';
    private localFile = null;
    private outFile = null;

    constructor(gl = 'KR', hl = 'KO', file = null, outfile = null) {
        this.gl = gl;
        this.hl = hl;
        this.localFile = file;
        this.outFile = outfile;
    }
    private async getHtml(gl: string, hl: string, file = null) {
        try {
            if (!this.localFile) {
                const result = await axios.get(
                    `https://www.youtube.com/feed/trending?gl=${gl}&hl=${hl}`
                );
                return result.data;
            } else {
                const result = await fs.promises.readFile(file, 'utf-8');
                return result;
            }
        } catch (error) {
            throw new Types.CrawlingError(Types.CrawlingErrorCode.Unknown);
        }
    }
    private analizeYoutubeTrendFeed(data: string) {
        try {
            const regexObj = new RegExp('ytInitialData = ({.*?});', 's');
            const playerInfoMatch = regexObj.exec(data);
            const ytInitialData = JSON.parse(playerInfoMatch[1]);
            fs.writeFileSync('test2.json', JSON.stringify(ytInitialData));
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
                                item.tabRenderer.title.toLowerCase() === 'ahora' ||
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
                /*const type = contents.shelfRenderer && contents.shelfRenderer.content
                            .expandedShelfContentsRenderer
                            ? 'expandedShelfContentsRenderer' // this case is video
                            : contents.shelfRenderer.content.horizontalListRenderer
                                ? 'horizontalListRenderer' // this case is shorts
                                : null;*/
                const type =
                    contents.shelfRenderer &&
                        contents.shelfRenderer.content.expandedShelfContentsRenderer
                        ? 'expandedShelfContentsRenderer' // this case is video
                        : contents.reelShelfRenderer
                            ? 'reelShelfRenderer' // this case is shorts
                            : null;
                if (type === 'expandedShelfContentsRenderer') {
                    const items =
                        contents.shelfRenderer.content.expandedShelfContentsRenderer.items;
                    for (const item of items) {
                        const result: Types.VideoTrendFeedInfo = {
                            videoId: item.videoRenderer.videoId,
                            viewCountText: item.videoRenderer.viewCountText.simpleText,
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
                if (type === 'reelShelfRenderer') {
                    // shorts case
                    const items = contents.reelShelfRenderer.items;

                    for (const item of items) {
                        const result: Types.VideoTrendFeedInfo = {
                            videoId: item.reelItemRenderer.videoId,
                            viewCountText: item.reelItemRenderer.viewCountText,
                            thumbnail: item.reelItemRenderer.thumbnail.thumbnails[0].url,
                            title:
                                item.reelItemRenderer.accessibility.accessibilityData.label,
                            rank: shortsRankNumber,
                            type: 'shorts',
                        };
                        shortsRankNumber += 1;
                        videoRanks.push(result);
                    }
                }
            }
            if (this.outFile) {
                fs.writeFileSync(this.outFile, JSON.stringify(videoRanks));
            }
            return videoRanks;
        } catch (e) {
            throw new Types.CrawlingError(Types.CrawlingErrorCode.InitalData);
        }
    }

    public async execute(): Promise<Types.VideoTrendFeedInfos | null> {
        const result = await this.getHtml(this.gl, this.hl, this.localFile);
        if (result) {
            const initYoutubeInfo = this.analizeYoutubeTrendFeed(result);
            return initYoutubeInfo;
        }
        return null;
    }
}

export default TrendVideoCrawler;
