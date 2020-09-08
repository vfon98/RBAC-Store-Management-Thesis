import { Component, OnInit } from '@angular/core';
import { ProductModalService } from 'src/app/service/product-modal.service';
import { StoreService } from  'src/app/core/http';
import { IProductBody } from 'src/app/core/models';
import { ProductService } from 'src/app/core/http/product.service';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css'],
})
export class ProductAddModalComponent implements OnInit {
  storeId: number;

  constructor(
    private productService: ProductService,
    private productModalService: ProductModalService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {}

  handleSubmit(body: IProductBody): void {
    body.storeId = this.storeId;
    this.productService.save(body).subscribe((product) => {
      console.log('Saved', product);
      this.storeService.addedSubject.next(product);
      this.handleCancel();
    });
  }

  handleCancel(): void {
    this.productModalService.hideAddModal();
  }
}
