// tslint:disable-next-line:no-import-side-effect
import 'jasmine';
import {crawling} from '../src/main';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 26000;
describe('crawling gl=KR hl=KO test', () => {
  it('crawling video', async () => {
    const result = await crawling('KR', 'KO');
    expect(result[0].videoId).toHaveSize('mF6DZTtXRw4'.length);
  });
});

describe('crawling gl=SG hl=EN test', () => {
  it('crawling video', async () => {
    const result = await crawling('US', 'EN');
    expect(result[0].videoId).toHaveSize('mF6DZTtXRw4'.length);
  });
});

describe('crawling gl=US hl=ES test', () => {
  it('crawling video', async () => {
    const result = await crawling('ES', 'ES');
    expect(result[0].videoId).toHaveSize('mF6DZTtXRw4'.length);
  });
});
