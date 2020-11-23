import { PaymentModalComponent } from './../modal/payment-modal/payment-modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { Injectable } from '@angular/core';
import { IPaymentInfo } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentModalService {
  modalRef: MDBModalRef;

  private options = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {},
  };

  constructor(private modalService: MDBModalService) {}

  show(data: IPaymentInfo): void {
    this.options.data = { paymentInfo: data };
    this.modalRef = this.modalService.show(PaymentModalComponent, this.options);
  }

  hide(): void {
    this.modalRef.hide();
  }
}
