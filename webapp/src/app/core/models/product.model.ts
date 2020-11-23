import { ICategory } from './category.model';
import {IImage} from "./image.model";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  // Quantity in warehouser
  quantity: number;
  // Quantity in store
  storeName?: string;
  storeProductQuantity?: number;
  createdAt?: number;
  categories?: ICategory[],
  categoryNames?: string[],
  images?: IImage[],
  imgUrl?: string;
  productId?: number;
  cartItemId?: number;
  storeId?: number;
  imageUrl?: string;
  discountPercent?: number;
  description?: string;
  outStock?: boolean;
}

export interface IProductBody {
  name: string;
  price: number;
  quantity?: number;
  storeId?: number;
  categories: number[];
  image: File
}
