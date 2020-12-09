import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-print-modal',
  templateUrl: './invoice-print-modal.component.html',
  styleUrls: ['./invoice-print-modal.component.css']
})
export class InvoicePrintModalComponent implements OnInit {
  isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {

  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
