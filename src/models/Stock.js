import { Category } from "./Category";

export class Stock {
  symbolOriginal: string;

  symbol: string;
  shortName: string;
  longName: string;
  type: string;
  region: string;
  currency: string;

  price: number;
  priceInBRL: number;

  category: Category;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
