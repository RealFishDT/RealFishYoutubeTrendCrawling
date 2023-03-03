// tslint:disable-next-line:no-import-side-effect
import 'jasmine';
import { crawlingTestWithLocalFile } from '../src/main';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 26000;
describe('crawling gl=KR hl=KO test', () => {
  it('crawling video', async () => {
    const result = await crawlingTestWithLocalFile('KR', 'KO', "./samples/2023.trend.page.html", "./samples/out.json");
    expect(result[0].videoId.length).not.toBeLessThan(0);
  });
});
