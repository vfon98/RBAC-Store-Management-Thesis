import { Component, OnInit } from '@angular/core';
import { IManagerTableStatistic } from "../shared-table-statistic/shared-table-statistic.component";
import { IOrder } from "../../../core/models";
import { CustomerService } from "../../../core/http";
import { ConfirmModalService } from "../../../service/confirm-modal.service";
import { NotificationService } from "../../../layouts/notification/notification.service";
import { ActivatedRoute } from "@angular/router";
import { ORDER_STATUS } from "../../../core/constants/common.constants";

@Component({
  selector: 'app-store-invoices',
  templateUrl: './store-invoices.component.html',
  styleUrls: ['./store-invoices.component.css']
})
export class StoreInvoicesComponent implements OnInit {
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
    this.customerService.fetchOrdersByStore(ORDER_STATUS.SHIPPED)
      .subscribe((orders) => {
        this.orders = orders;
        this.initializeStatistics();
      });
  }

  isShipping(order: IOrder): boolean {
    return order.status === 'Shipping';
  }

  // markAsShipped(id: string): void {
  //   this.confirmService.show('Mark as shipped?').onYes(() => {
  //     this.customerService
  //       .updateOrderStatus(id, { status: 'Shipped' })
  //       .subscribe((order) => {
  //         const index = this.orders.findIndex((order) => order.id === id);
  //         this.orders[index] = order;
  //         this.notiService.showSuccess('Update order successfully!');
  //       });
  //   });
  // }
}
