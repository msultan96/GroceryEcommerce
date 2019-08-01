export class ProductModel {
  upc: string;
  brand: string;
  type: string;
  variety: string;
  weight: string;
  category: string;
  availability: boolean;
  currentPrice: number;
  regularPrice: number;
  salePrice: number;
  saleDateStart: Date;
  saleDateEnd: Date;
  image: File;
}
