import { IProduct } from './product.model';
import { ICategory } from './category.model';
import { IImage } from "./image.model";
import { IUser } from "./user.model";

export interface IPageableProduct {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  products: IProduct[];
}

export interface IShoppingProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  storeName: string;
  categoryNames: string[];
}

export interface ICart {
  id?: number;
  createdAt?: number;
  totalPrice?: number;
  totalPriceWithDiscount?: number;
  totalDiscount?: number;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  storeProductQuantity?: number;
  createdAt?: number;
  categories?: ICategory[];
  productId?: number;
  storeId?: number;
  storeName?: string;
  images?: IImage[];
  imageUrl?: string;
  discountPercent?: number;
}

export interface ICartItemBody {
  idCartItem: number;
  quantity: number;
}

export interface IMergeCartBody {
  productId: number;
  quantity: number;
  storeId: number;
}

export interface IOrder {
  id: number;
  totalPrice: number;
  createdAt: number;
  phone: string;
  shipAddress: string;
  transactionId: string;
  status: string;
  orderItems?: [{ id: number, product: IProduct, quantity: number }],
  paymentMethod?: string;
  staff?: IUser;
}

export interface IProductFilter {
  params: {
    storeId: number;
    categoryId: number;
  };
  query?: {
    page: number;
    size?: number;
    search?: string;
    sortBy?: string;
    direction?: string;
    priceForm?: string;
    priceTo?: string;
  };
}

export interface ICustomerBody {
  name: string;
  email: string;
  address: string;
  username: string;
  password: string;
}
