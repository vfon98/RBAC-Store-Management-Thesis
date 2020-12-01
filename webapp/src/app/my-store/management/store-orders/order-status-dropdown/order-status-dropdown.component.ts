import { Component, Input, OnInit } from '@angular/core';
import { ConfirmModalService } from "../../../../service/confirm-modal.service";

type StatusItem = {
  color: string,
  value: string,
  text: string,
  icon?: string
}

@Component({
  selector: 'app-order-status-dropdown',
  templateUrl: './order-status-dropdown.component.html',
  styleUrls: ['./order-status-dropdown.component.scss']
})
export class OrderStatusDropdownComponent implements OnInit {
  @Input()
  orderId: string | number;

  statusList: StatusItem[] = [
    { color: 'processing', value: 'shipping', text: 'Mark as Shipping', icon: 'sync'},
    { color: 'success', value: 'shipped', text: 'Mark as Shipped', icon: 'check-circle'},
    { color: 'red', value: 'cancel', text: 'Mark as Cancel', icon: 'close-circle'},
    { color: 'orange', value: 'failed', text: 'Mark as Shipping Failed', icon: 'info-circle'},
    { color: 'magenta', value: 'rejected', text: 'Mark as Customer Rejected', icon: 'stop'},
  ]

  constructor(
    private confirmService: ConfirmModalService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(orderId: string, status: string): void {
    this.confirmService.showNzConfirm(() => {
      console.log("OK")
    })
  }

}
