import { Category } from "./Category";

export class Stock {
    symbolOriginal: String;

    symbol: String;
    shortName: String;
    longName: String;
    type: String;
    region: String;
    currency: String;

    price: number;
    priceInBRL: number;

    category: Category;

    createdAt: String;
    updatedAt: String;
    deletedAt: String;
}