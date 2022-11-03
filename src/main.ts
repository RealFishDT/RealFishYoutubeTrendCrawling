// eslint-disable-next-line node/no-unpublished-import
//in
import {TrendVideoCrawler} from './crawling';
import {VideoTrendFeedInfos} from './types';
export async function crawling(
  gl = 'KR',
  gh = 'KO'
): Promise<VideoTrendFeedInfos> {
  return await new TrendVideoCrawler(gl, gh).execute();
}

export default crawling;
