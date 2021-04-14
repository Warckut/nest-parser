export class Site  {
    name: string;
    urlVideocards: string;
    classPaginationWidget: string
    classTitle: string;
}

export const SITES: Site[] = [
    // {
    //     name: "Citilink", 
    //     urlVideocards: "https://www.citilink.ru/catalog/videokarty/?p=",
    //     classPaginationWidget: ".PaginationWidget__page-link",
    //     classTitle: ".ProductCardHorizontal__title",

    // },
    {
        name: "DNS",
        urlVideocards: "https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/?p=",
        classPaginationWidget: ".pagination-widget__page-link",
        classTitle: ".catalog-product__name",
    }
];