import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { ConfirmModalService } from './../../../service/confirm-modal.service';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/http';
import { IManagerTableStatistic } from '../shared-table-statistic/shared-table-statistic.component';
import { ORDER_STATUS } from "../../../core/constants/common.constants";

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css'],
})
export class StoreOrdersComponent implements OnInit {
  statistics: IManagerTableStatistic[];
  orders: IOrder[] = [];
  storeId: number;

  constructor(
    private customerService: CustomerService,
    private confirmService: ConfirmModalService,
    private notiService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.storeId = +params.id;
    });
    this.fetchOrders();
    this.customerService.orderChanged$.subscribe(() => {
      this.fetchOrders();
    })
  }

  initializeStatistics(): void {
    this.statistics = [
      { title: 'Total', value: this.orders.length },
      {
        title: 'Shipping',
        value: this.orders.filter((o) => o.status === 'Shipping').length,
      },
      {
        title: 'Shipped',
        value: this.orders.filter((o) => o.status === 'Shipped').length,
      },
    ];
  }

  fetchOrders(): void {
    this.customerService.fetchOrdersByStore().subscribe((orders) => {
      this.orders = orders;
      this.initializeStatistics();
    });
  }

  isShipping(order: IOrder): boolean {
    return order.status === ORDER_STATUS.SHIPPING;
  }
  isFailed(order: IOrder): boolean {
    const failedStatus = [
      ORDER_STATUS.CUSTOMER_CANCELED,
      ORDER_STATUS.STORE_CANCELED,
      ORDER_STATUS.CUSTOMER_REFUND,
      ORDER_STATUS.SHIPPING_FAILED,
      ORDER_STATUS.CUSTOMER_REJECTED,
      ORDER_STATUS.INVALID,
      ORDER_STATUS.EXPIRED
    ];

    return failedStatus.some(item => item.toString() === order.status);
  }

  markAsShipped(id: number): void {
    this.confirmService.show('Mark as shipped?').onYes(() => {
      this.customerService
        .updateOrderStatus(id, { status: 'Shipped' })
        .subscribe((order) => {
          const index = this.orders.findIndex((order) => order.id === id);
          this.orders[index] = order;
          this.notiService.showSuccess('Update order successfully!');
        });
    });
  }
}
