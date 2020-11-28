import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { ShoppingModalService } from './../../../service/shopping-modal.service';
import { CartService } from '../../../core/http/cart.service';
import { IProduct } from 'src/app/core/models';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;

  isOutOfStock = false;
  imgUrl: string;
  storeId: number;

  listener: Subscription;

  constructor(
    private cartService: CartService,
    private shoppingModalService: ShoppingModalService,
    private notiService: NotificationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.addFieldsToProduct();
    this.checkOutOfStock();
    // this.imgUrl = this.product?.imageUrl || `https://picsum.photos/id/${this.randomImgId()}/400`;
    this.imgUrl = this.product?.imageUrl;
    this.listener = this.cartService.outStockListener$.subscribe((id) => {
      if (id === this.product.id && !this.isSoldOut()) {
        this.isOutOfStock = true;
      }
      if (id === -this.product.id) {
        this.isOutOfStock = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  addFieldsToProduct(): void {
    this.product.storeId = +this.route.snapshot.params.storeId;
    this.product.productId = this.product.id;
  }

  checkOutOfStock(): void {
    const cartItem = this.cartService
      .getCart()
      .items.find((item) => item.productId === this.product.id);
    if (cartItem?.quantity >= this.product?.quantity && !this.isSoldOut()) {
      this.isOutOfStock = true;
    }
  }

  printCategories(): string {
    return this.product.categoryNames.join(', ');
  }

  isSoldOut(): boolean {
    return this.product?.outStock;
  }

  addToCart(event: Event): void {
    event.stopPropagation(); // Prevent conflict with card event

    if (this.isSoldOut()) {
      return this.notiService.showError('Product has sold out!');
    }

    // this.cartService.addItem({ ...this.product, quantity: 1 });
    this.cartService.addItem({ ...this.product });
  }

  randomImgId(): number {
    return Math.round(Math.random() * 50);
  }

  showProductModal(e: Event): void {
    // e.stopPropagation();
    this.shoppingModalService.show({ ...this.product, imgUrl: this.imgUrl });
  }
}
