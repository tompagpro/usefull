import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class ScrapingService {
  async scrapeTitleFromUrl(url: string): Promise<{ title: string } | null> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const { document } = new JSDOM(html).window;
      const firstH1 = document.querySelector('h1')?.textContent?.trim() || null;
      return { title: firstH1 };
    } catch (error) {
      console.error('Error fetching URL:', error);
      return null;
    }
  }
  // method for images ?
  // console.log(document.querySelector('img'));

  // to have the favicon ?
  // console.log(
  //   url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/)[0],
  // );
}
