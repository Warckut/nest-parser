import { Injectable, Logger } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import * as cheerio from 'cheerio'
import { Videocard } from 'src/domains/entities/Videocard';


@Injectable()
export class ParserService {
    private readonly logger = new Logger("ParserService");
    constructor(private readonly puppeteerService: PuppeteerService,
    ) {}

    private arrayFromLength(number: number) {
        return Array.from(new Array(number).keys()).map(k => k + 1)
    }
    
    async loadVideocardsCitilink(): Promise<Videocard[]> {
        const siteURL = "https://www.citilink.ru/catalog/videokarty/?p="
        
        const pageContent = await this.puppeteerService.getPageContent(siteURL)

        const $ = cheerio.load(pageContent)

        const countPages =  ($('*').is('.PaginationWidget__page-link')) ? 
            parseInt($(".PaginationWidget__page-link")
            .last()
            .text()
            .replace(/\s+/g, ' ')
            .trim()) : 1

        this.logger.debug(typeof countPages)      
        const Pages = this.arrayFromLength(
            countPages
        )

        const videocards : Videocard[] = []

        for(const page of Pages) {
            const pageContent = await this.puppeteerService.getPageContent(`${siteURL}${page}`)
            const $ = cheerio.load(pageContent)

            $('.ProductCardHorizontal__title').each( (i, header) =>  {

                if ($(header)
                .parent()
                .hasClass("ProductCardHorizontal__block_not-available")
                ) // если родительский элемент имеет класс ...
                    return true

                const href = `https://www.citilink.ru/${$(header).attr('href')}`

                const dataCard = JSON.parse(
                    $(header)
                    .parent()
                    .parent()
                    .attr("data-params")
                )

                const price = dataCard.price
                const name = dataCard.shortName

                const srcImage = $('.ProductCardHorizontal__image')
                    .map((j, image) => {
                        if (j == i)
                            return image;
                    })
                    .attr('src')
                
                videocards.push({
                    name: name,
                    href: href,
                    srcImage: srcImage,
                    price: parseInt(price),
                    shop: "Citilink"
                })
            })
        }
        return videocards;
    }

    async loadVideocardsOmega(): Promise<Videocard[]> 
    {
        const siteURL = "https://omega-shops.ru/products/komplektuyushchie/videokarty/?PAGEN_1="
        
        const pageContent = await this.puppeteerService.getPageContent(siteURL)
        
        const $ = cheerio.load(pageContent)
        const countPages = this.arrayFromLength(
            parseInt($(".nums")
                .children()
                .last()
                .text()
                .replace(/\r?\n/g, "")
                .trim()
            )
        )
        
        const videocards : Videocard[] = []

        for(const page of countPages) {
            const pageContent = await this.puppeteerService.getPageContent(`${siteURL}${page}`)
            const $ = cheerio.load(pageContent)

            $('.item-title').each( (i, header) =>  {

                const href = `https://omega-shops.ru${$(header).children().attr('href')}`
                this.logger.debug(href)

                const price = $(header).parent().parent().parent().children().last()
                .children().first().children().first().children().first().text().replace(/[^\d]/g, '').toString();

                // const price = $('.price')
                // .map((j, element) => {
                //     if (j == i)
                //         return $(element).text().replace(/[^\d]/g, '');
                // })
                // .toArray()
                // .toString()

                this.logger.debug(price)

                const name = $(header)
                .children()
                .children()
                .text()
                .replace(/\r?\n/g, "")
                // .trim()
                this.logger.debug(name)

                // const srcImage = "https://omega-shops.ru" + $('a.thumb img')
                //     .map((j, element) => {
                //         if (j == i)
                //             return $(element).attr('src');
                //     }).toArray()
                    

                const srcImage = "https://omega-shops.ru" + $(header).parent().parent().parent().children().first()
                .children().first().children().last().children().first().attr('src')

                this.logger.debug(srcImage)

                
                videocards.push({
                    name: name,
                    href: href,
                    srcImage: srcImage,
                    price: parseInt(price),
                    shop: "Omega"
                })
            })
        }
        return videocards;
    }

    public async loadAllVideocards(): Promise<Videocard[]> {
        const videocards: Videocard[] = [
            ... await this.loadVideocardsCitilink(), 
            ... await this.loadVideocardsOmega()
        ]
        return videocards;
        // return [];
    }

}