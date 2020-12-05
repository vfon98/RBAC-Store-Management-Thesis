import { IProduct } from "./product.model";
import { IStore } from "./store.model";

export class IBestSeller {
  product: IProduct;
  store: IStore;
  totalSold: number;
}
