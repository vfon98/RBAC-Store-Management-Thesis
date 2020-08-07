import { CartService } from './../../service/cart.service';
import { CustomerService } from './../../service/customer.service';
import { StripeFormComponent } from './../../shopping/cart-checkout/stripe-form/stripe-form.component';
import {
  PaymentModalService,
  IPaymentInfo,
} from './../../service/payment-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent implements OnInit {
  @ViewChild(StripeFormComponent) stripeForm: StripeFormComponent;
  paymentInfo: IPaymentInfo;
  isLoading = false;

  constructor(
    private paymentModal: PaymentModalService,
    private notiService: NotificationService,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hideModal(): void {
    this.paymentModal.hide();
  }

  handleToken(token: { id: string }): void {
    this.paymentInfo.stripeToken = token.id;
  }

  handlePayment(): void {
    if (!this.paymentInfo.stripeToken) {
      this.stripeForm
        .handleCardSubmit()
        .then((token) => {
          this.checkoutPayment();
        })
        .catch(() => {
          this.notiService.showQuickWarning('Please check your card');
        });
      return;
    }
    this.checkoutPayment();
  }

  checkoutPayment(): void {
    console.log(this.paymentInfo);
    this.isLoading = true;
    this.customerService.checkoutPayment(this.paymentInfo).subscribe((charge) => {
      console.log(charge)
      this.isLoading = false;
      this.hideModal();
      this.notiService.showSuccess('Checkout successfully!');
      this.cartService.clearCart(this.cartService.getCart().id);
      this.router.navigate(['/shopping']);
    })
  }
}