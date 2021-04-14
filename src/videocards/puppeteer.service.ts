import { Injectable, Logger } from '@nestjs/common';
import { InjectBrowser, InjectContext } from 'nest-puppeteer';
import { Browser, BrowserContext } from 'puppeteer';
import * as fs from "fs"
import * as path from 'path'


@Injectable()
export class PuppeteerService {
    private readonly logger = new Logger("ParserService");
    constructor(
        @InjectBrowser("Chrome") private readonly browser: Browser
        ) {}

    async getPageContent(url: string) {
        const page = await this.browser.newPage()
        
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 3000000
          })

        const content = await page.content()
        this.browser.close()
        return content;
    }

    async downloadImage(url:string, title: string){
        const page = await this.browser.newPage()
        const viewSource = await page.goto(url)

        fs.writeFile(`./images/${title}}.jpg`, await viewSource.buffer(), function(err) {
            if(err) {
                this.logger.debug(err);
            }
        });
        this.browser.close()
    }
}
