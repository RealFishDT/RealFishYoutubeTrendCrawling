# RealFish Youtube Trend Video Crawling

Real Fish Youtube Trend Video Crawling(RYCT)

- **pure crawling youtube video site and public api**
- **this module do not use youtube/google api, don't worry google api quota**

## **Install**

```
npm i realfish-yct
```

## **Support features:**

- Get On Trend Video List from youtube video web site
- region and language support
  support languages are "KO", "EN", ISO 639-1, CAPITAL CASE
  support region are ISO 3166-1 alpha-2 that youtube support, CAPITAL CASE
- this RYCT don't use headless browser and selector library like cheerio or scrapy, just use ajax, so fast and light
- this works on nodejs and electron
  - unfortunately, not support common modern browser because CORS or SOP error
- Typescript support
- async/await support

## **Dependency:**

- axios
- node js > 16.0.0

## **RYCT APIS**

- API
  - crawling( gl: string, hl: string)
    - gl: region(national code) defualt "KR"
      - on trend(인급동) video ranks list is diffrent by gl
      - each region have each "on trend videos"
      - it affect "rank" property
    - hl: lanugage code default "KO", it's only support "KO", "EN"
      - if you use other language code, this module can not extract video list from youtube
- Typescript

  ```ts
  import {crawling} from 'realfish-yct';
  const result = await crawling();
  ```

  ```ts
  import {crawling} from 'realfish-yct';
  const result = await crawling('US', 'EN');
  ```

- Javascript

  ```js
  const A = require('realfish-yc');

  A.crawling().then(h => {
    console.log(h);
  });
  ```

  ```js
  const A = require('realfish-yc');

  A.crawling('US', 'EN').then(h => {
    console.log(h);
  });
  ```

  **youtube video crawling** : return information videos

  - crawling(videoid: string)
    - videoID: Youtube video id

- Output

  - output data is json, gl=KR, hl=KO, korea, korean

    ```json
    [
      {
        "videoId": "BKciq4cmElM",
        "thumbnail": "https://i.ytimg.com/vi/BKciq4cmElM/hqdefault.jpg?sqp=-oaymwEiCNIBEHZIWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBu5dbY-85_7lm8DyDZ3NRPLDFTMg",
        "title": "How to Teach Your Dog to Play Dead",
        "channelId": "UCLjhnUSXzC0F1WU70uQoYcA",
        "rank": 1,
        "type": "shorts"
      },
      {
        "videoId": "BKciq4cmElM",
        "thumbnail": "https://i.ytimg.com/vi/BKciq4cmElM/hqdefault.jpg?sqp=-oaymwEiCNIBEHZIWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBu5dbY-85_7lm8DyDZ3NRPLDFTMg",
        "title": "How to Teach Your Dog to Play Dead",
        "channelId": "UCLjhnUSXzC0F1WU70uQoYcA",
        "rank": 1,
        "type": "video"
      }
      .
      .
      .
      .

    ]
    ```

  - output data is json, gl=SG, hl=EN, singapole, english
    ```json
    [{
      "videoId": "BKciq4cmElM",
      "thumbnail": "https://i.ytimg.com/vi/BKciq4cmElM/hqdefault.jpg?sqp=-oaymwEiCNIBEHZIWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBu5dbY-85_7lm8DyDZ3NRPLDFTMg",
      "title": "How to Teach Your Dog to Play Dead",
      "channelId": "UCLjhnUSXzC0F1WU70uQoYcA",
      "rank": 1,
      "type": "shorts"
    },
    {
      "videoId": "BKciq4cmElM",
      "thumbnail": "https://i.ytimg.com/vi/BKciq4cmElM/hqdefault.jpg?sqp=-oaymwEiCNIBEHZIWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBu5dbY-85_7lm8DyDZ3NRPLDFTMg",
      "title": "How to Teach Your Dog to Play Dead",
      "channelId": "UCLjhnUSXzC0F1WU70uQoYcA",
      "rank": 1,
      "type": "video"
    }
    .
    .
    .
    ]
    ```

- properties

  - videoId: youtube video id
  - thumbnail: video thumbnail url
  - title: video title
  - channelId: this video owner channel id
  - rank: video rank in On Trend Videos(인급동)
  - type: 'shorts', 'video'
    - shorts: shorts video
    - video: normal youtube video

- **if you want sorted rank list by type, please use rank and type property**
- **this module list provide short and video type are mixed list**

  **Product**

- [RealFishDev Hom](https://realfish-likeview.web.app)

- [Chrome Extension, Realfish View Like](https://chrome.google.com/webstore/detail/youtube-real-fish-view-li/eeeailknbdnnjbceiioeimophdjcjkaf/related?authuser=1?authuser=1&gclid=CjwKCAjwh4ObBhAzEiwAHzZYU3W9Hy0HySCDOg_lae3yCiLU-bBSl6a5Vz_YTloxBYbqY67srZ4jBhoCOEwQAvD_BwE)

  **RYCT(RealFish Youtube Trend Video Crawling) LICENSE**

- Real Fish ISC

```
Copyright (c) 2022 year, Real Fish Inc Content Dev Solutions

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

made by RealFishDT