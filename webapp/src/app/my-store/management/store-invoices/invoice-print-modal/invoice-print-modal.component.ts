import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from "../../../../service/order.service";
import { IOrder } from "../../../../core/models";
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoice-print-modal',
  templateUrl: './invoice-print-modal.component.html',
  styleUrls: ['./invoice-print-modal.component.css']
})
export class InvoicePrintModalComponent implements OnInit {
  isVisible = false;
  orderId: string;
  order: IOrder;

  @ViewChild('invoiceDiv')
  invoiceDiv: ElementRef;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  fetchOrderById(orderId: string): void {
    this.orderService.fetchOrderByIdManager(orderId).subscribe(order => {
      console.log("ORDER", order);
      this.order = order;
    });
  }

  showModal(orderId: string): void {
    console.log("SHOW MODAL", orderId)
    this.isVisible = true;
    this.orderId = orderId;
    this.fetchOrderById(this.orderId);
  }

  handleOk(): void {
    this.printInvoice();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  printInvoice(): void {
    // console.log("PRINTKJASDKLjf")
    // // Popup($('.invoice')[0].outerHTML);
    // Popup(this.invoiceDiv.outerHTML);
    //
    // function Popup(data) {
    //   window.print();
    //   return true;
    // }

    const content = this.invoiceDiv.nativeElement;
    const doc = new jsPDF();
    const _elementHandlers =
      {
        '#editor': function (element, renderer) {
          return true;
        }
      };
    doc.addPage();

    doc.save('test.pdf');
  }

  getSubtotal(): number {
    if (!this.order) return;

    return this.order.orderItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0)
  }

  getDiscount(): number {
    if (!this.order) return;

    return this.order.orderItems.reduce((total, item) => {
      return total + (item.product.price * item.product.discountPercent / 100) * item.quantity;
    }, 0)
  }

}
