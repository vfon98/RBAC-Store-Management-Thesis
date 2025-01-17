import { NotificationService } from './../../layouts/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from  'src/app/core/http';
import { IProduct } from 'src/app/core/models';
import { ProductImportModalService } from './../../service/product-import-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-import-modal',
  templateUrl: './product-import-modal.component.html',
  styleUrls: ['./product-import-modal.component.css'],
})
export class ProductImportModalComponent implements OnInit {
  product: IProduct;
  importedQuan = 1;

  constructor(
    private productImportModalService: ProductImportModalService,
    private storeService: StoreService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {}

  hideModal(): void {
    this.productImportModalService.hide();
  }

  incQuantity(): void {
    this.importedQuan = +this.importedQuan + 1;
  }

  desQuantity(): void {
    if (this.importedQuan <= 1) return;
    this.importedQuan = +this.importedQuan - 1;
  }

  handleImport(): void {
    this.storeService
      .addProductWithQuantity(
        this.product.storeId,
        this.product.id,
        this.importedQuan,
        true
      )
      .subscribe(
        () => {
          this.notiService.showQuickSuccess('Imported successfully!');
          this.storeService.importedSubject.next({
            id: this.product.id,
            newQuan: this.importedQuan,
          });
          this.productImportModalService.hide();
        },
        (err: HttpErrorResponse) => {
          if (err.status === 406) {
            this.notiService.showError('Not enough quantity');
          }
        }
      );
  }
}
