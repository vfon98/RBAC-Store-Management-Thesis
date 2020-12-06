import { Component, OnInit } from '@angular/core';
import {CartService, CustomerService} from "../../../core/http";
import { IAgmMarker, ICartItem, IProduct, IStore } from "../../../core/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  product: IProduct;
  stores: IStore[] = [];
  storeMarkers: IAgmMarker[] = [];

  quantity = 1;
  addedQuantity = 0;
  selectedIndex = 0;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.findAddedQuantity();
    this.route.params.subscribe(params => {
      this.fetchProductDetails(params.productId);
      this.fetchStoreList(params.productId);
    })
  }

  fetchProductDetails(productId: number): void {
    this.customerService.fetchProductDetails(productId)
      .subscribe(product => {
        this.product = product;
      }, err => {
        console.error("Error", err);
        this.router.navigate(['/shopping']);
      });
  }

  fetchStoreList(productId: number): void {
    this.customerService.fetchStoreListByProductId(productId)
      .subscribe(stores => {
        this.stores = stores;
        this.product.storeId = stores[0].id;
        this.product.storeName = stores[0].name;

        this.storeMarkers = this.stores.map(store => ({
          latitude: store.latitude,
          longitude: store.longitude,
          label: store.name
        }))
      });
  }

  findAddedQuantity(): void {
    const items: ICartItem[] = this.cartService.getCart().items;
    const addedItem = items.find(item => item.productId === this.product?.id);
    if (addedItem) {
      this.addedQuantity = addedItem.quantity;
    }
  }

  incQuantity(): void {
    // if (this.quantity >= this.product.quantity - this.addedQuantity) return;
    this.quantity = +this.quantity + 1;
  }

  desQuantity(): void {
    if (this.quantity <= 1) return;
    this.quantity = +this.quantity - 1;
  }

  addToCart(): void {
    this.cartService.addItem(this.product, this.quantity);
  }

  addToCartAndCheckout(): void {
    this.addToCart();
    this.router.navigate(['/shopping', 'cart']);
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }

  changeSelectedStore(index: number): void {
    const currentStore = this.stores?.length && this.stores[index];

    this.product.storeName = currentStore.name;
    this.product.storeId = currentStore.id;

    this.selectedIndex = index;
  }
}


