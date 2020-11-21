import { PaymentModalService } from './../../service/payment-modal.service';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Subscription } from 'rxjs';
import { UserCheckoutFormComponent } from './user-checkout-form/user-checkout-form.component';
import { ICart } from 'src/app/core/models';
import { CartService } from '../../core/http/cart.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ConfirmModalService } from "../../service/confirm-modal.service";
import { log } from "ng-zorro-antd";

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css'],
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(UserCheckoutFormComponent)
  checkoutComponent: UserCheckoutFormComponent;
  cart: ICart = { totalPrice: 0, items: [] };
  listener: Subscription;

  constructor(
    private cartService: CartService,
    private notiService: NotificationService,
    private paymentModal: PaymentModalService,
    private nzConfirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.cartService.fetchCart();
    this.listener = this.cartService.changeListener$.subscribe((cart) => {
      this.cart = this.cartService.getCart();
    });
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  async handleCheckout(): Promise<void> {
    const body = this.checkoutComponent.userForm;
    if (body.paymentMethod === 'cash') {
      try {
        await this.nzConfirmService.showNzConfirm();
      } catch (e) {
        return;
      }
    }

    const currentCart = this.cartService.getCart();
    if (!currentCart.items.length) {
      this.notiService.showQuickWarning('Empty cart');
      return;
    }

    if (!this.isValidForm()) {
      this.notiService.showQuickWarning('Please fill in your information');
      return;
    }

    body.totalPrice = this.cartService.getCart().totalPrice;
    this.paymentModal.show(body);
  }

  isValidForm(): boolean {
    const body = this.checkoutComponent.userForm;
    return body.shipAddress !== '' && body.phone !== '';
  }
}
