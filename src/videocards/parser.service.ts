import { Injectable, Logger } from '@nestjs/common';
import { InjectBrowser, InjectContext } from 'nest-puppeteer';
import { Browser, BrowserContext } from 'puppeteer';
import { Site, SITES } from './entities/SITES';
import { PuppeteerService } from './puppeteer.service';
import * as cheerio from 'cheerio'
import { slugify } from 'transliteration'

@Injectable()
export class ParserService {
    private readonly logger = new Logger("ParserService");
    constructor(private readonly puppeteerService: PuppeteerService,
    ) {}

    private arrayFromLength(number: number) {
        return Array.from(new Array(number).keys()).map(k => k + 1)
    }

    private getCountPages(paginationWidget: string, pageContent: string) : number{
        const $ = cheerio.load(pageContent)
        return parseInt($(paginationWidget)
                .last()
                .text()
                .replace(/\s+/g, ' ')
                .trim())
    }

    async loadVideocardsSitilink() {
        const siteURL = "https://www.citilink.ru/catalog/videokarty/?p="
            
        let pageContent = await this.puppeteerService.getPageContent(siteURL)
        
        const countPages = this.arrayFromLength(
            this.getCountPages(".PaginationWidget__page-link", pageContent)
        )

        const videocards = []

        for(const page of countPages) {
            pageContent = await this.puppeteerService.getPageContent(`${siteURL}${page}`)
            const $ = cheerio.load(pageContent)

            $('.ProductCardHorizontal__title').each((i, header) => {
                                
                const title = $(header).text();
                const code = slugify(title)
                const href = $(header).attr('href')
                
                const price = $('.ProductCardHorizontal__price_current-price')
                    .map((j, cPrice) => {
                        if (j == i)
                            return cPrice;
                    })
                    .text()
                    .replace(/\r?\n/g, "")
                    .trim()
                    .split(' ')
                    .join('')

                const srcImage = $('.ProductCardHorizontal__image')
                    .map((j, image) => {
                        if (j == i)
                            return image;
                    })
                    .attr('src')

                this.puppeteerService.downloadImage(srcImage, code);
                videocards.push({
                    title: title,
                    href: href,
                    code: code,
                    price: price
                })
            })
        }

        return videocards;
    }

    public async loadAllVideocards() {
        const videocards = await this.loadVideocardsSitilink()
    }
    
}

