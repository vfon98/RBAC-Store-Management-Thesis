import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from '../../core/http/cart.service';
import { StripeFormComponent } from '../../shopping/cart-checkout/stripe-form/stripe-form.component';
import { PaymentModalService } from '../../service/payment-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/http';
import { IPaymentInfo } from 'src/app/core/models';
import { ConfirmModalService } from "../../service/confirm-modal.service";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent implements OnInit {
  @ViewChild(StripeFormComponent) stripeForm: StripeFormComponent;
  paymentInfo: IPaymentInfo;
  isLoading = false;
  isPaymentOnline = true;

  constructor(
    private paymentModal: PaymentModalService,
    private notiService: NotificationService,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router,
    private nzConfirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    if (this.paymentInfo.paymentMethod === 'cash') {
      this.isPaymentOnline = false;
    }
  }

  hideModal(): void {
    this.paymentModal.hide();
  }

  handleToken(token: { id: string }): void {
    this.paymentInfo.stripeToken = token.id;
  }

  handlePayment(): void {
    if (!this.paymentInfo.stripeToken && this.paymentInfo.paymentMethod === 'online') {
      this.isLoading = true;
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

    this.hideModal();
    this.nzConfirmService.showNzConfirm(() => {
      this.checkoutPayment();
    });
  }

  checkoutPayment(): void {
    this.isLoading = true;
    this.customerService.checkoutPayment(this.paymentInfo).subscribe(
      (charge) => {
        console.log(charge);
        this.isLoading = false;
        this.hideModal();
        this.notiService.showSuccess('Checkout successfully!');
        this.cartService.clearCart(this.cartService.getCart().id);
        this.router.navigate(['/shopping']).then(() => {
          location.reload();
        });
      },
      (err: HttpErrorResponse) => {
        if (err.status === 406) {
          this.notiService.showError('Not enough product in store');
        } else {
          this.notiService.showError('Error on payment');
        }
        this.isLoading = false;
        this.hideModal();
        console.log(err);
      }
    );
  }
}
