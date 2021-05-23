import { Injectable, Logger } from '@nestjs/common';
import { InjectBrowser } from 'nest-puppeteer';
import { Browser } from 'puppeteer';


@Injectable()
export class PuppeteerService {
    private readonly logger = new Logger("ParserService");
    constructor(
        @InjectBrowser("Chrome") private readonly browser: Browser
        ) {}

    async getPageContent(url: string) {
        const page = await this.browser.newPage()
        
        await page.goto(url, {
            waitUntil: 'networkidle2'
            ,
            timeout: 3000000
          })

        const content = await page.content()
        return content;
    }
}
