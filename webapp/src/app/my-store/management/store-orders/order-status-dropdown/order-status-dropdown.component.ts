import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ConfirmModalService } from "../../../../service/confirm-modal.service";
import { CustomerService } from "../../../../core/http";
import { NotificationService } from "../../../../layouts/notification/notification.service";
import { IOrder } from "../../../../core/models";

type StatusItem = {
  color: string,
  value: string,
  text: string,
  icon?: string,
  allow?: number[]
}

@Component({
  selector: 'app-order-status-dropdown',
  templateUrl: './order-status-dropdown.component.html',
  styleUrls: ['./order-status-dropdown.component.scss']
})
export class OrderStatusDropdownComponent implements OnInit, OnChanges {
  @Input()
  order: IOrder;

  currentStatus: StatusItem;

  statusList: StatusItem[] = [
    {
      color: 'processing',
      value: 'shipping',
      text: 'Mark as Shipping',
      icon: 'sync',
      allow: [1, 2, 3, 4]
    },
    {
      color: 'success',
      value: 'shipped',
      text: 'Mark as Shipped',
      icon: 'check-circle',
      allow: []
    },
    {
      color: 'red',
      value: 'store_canceled',
      text: 'Mark as Cancel',
      icon: 'close-circle',
      allow: []
    },
    {
      color: 'orange',
      value: 'shipping_failed',
      text: 'Mark as Shipping Failed',
      icon: 'info-circle',
      allow: []
    },
    {
      color: 'magenta',
      value: 'customer_rejected',
      text: 'Mark as Customer Rejected',
      icon: 'stop',
      allow: [3]
    },
  ]

  constructor(
    private confirmService: ConfirmModalService,
    private customerService: CustomerService,
    private notiService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.order) return;

    this.currentStatus =
      this.statusList.find(status =>
        status.value.toUpperCase() === this.order.status.toUpperCase());
  }

  changeStatus(orderId: number, status: string): void {
    this.confirmService.showNzConfirm(() => {
      this.customerService
        .updateOrderStatus(orderId, { status: status.toUpperCase() })
        .subscribe((order) => {
          this.notiService.showSuccess('Update order successfully!');
          this.customerService.orderChanged.next();
        });
    })
  }

}
