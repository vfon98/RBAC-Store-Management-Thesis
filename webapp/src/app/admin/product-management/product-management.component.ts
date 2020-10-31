import { ProductService } from './../../core/http/product.service';
import { ConfirmModalService } from './../../service/confirm-modal.service';
import { ProductModalService } from './../../service/product-modal.service';
import { NotificationService } from './../../layouts/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/core/models';
import { ITableOverviewModel } from 'src/app/core/models/table-overview.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  products: IProduct[] = [];
  figures: ITableOverviewModel[] = [];

  constructor(
    private productService: ProductService,
    private notiService: NotificationService,
    private productModalService: ProductModalService,
    private confirmService: ConfirmModalService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.productService.updateObservable$.subscribe((product: IProduct) => {
      // const index: number = this.products.findIndex((p) => p.id === product.id);
      // this.products[index] = product;
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.productService.fetchProducts().subscribe((products) => {
      this.products = products;
      this.initializeTableOverview(products);
    });
  }

  initializeTableOverview(products: IProduct[]): void {
    this.figures = [
      {
        title: 'Total products',
        number: products.length,
        extra: '+3 last week',
      },
      {
        title: 'Category in use',
        number: new Set(
          ...products.map((p) => p.categories[0].name)
        ).size,
        extra: 'up to date',
      },
      {
        title: 'Total quantity',
        number: products.reduce((total, p) => total + p.quantity, 0),
        extra: '+3 last week',
      },
    ];
  }

  showDetailsModal(id: number): void {
    this.productService.fetchProductById(id).subscribe((product) => {
      this.productModalService.showDetailsModal(product);
    });
  }

  showUpdateModal(id: number): void {
    this.productService.fetchProductById(id).subscribe((product) => {
      this.productModalService.showUpdateModal(product);
    });
  }

  deleteProduct(id: number): void {
    this.confirmService.show();
    this.confirmService.onYes(() => {
      this.productService.deleteById(id).subscribe(() => {
        this.products = this.products.filter((store) => store.id !== id);
        this.notiService.showSuccess('Delete successfully!');
      });
    });
  }

  getCategories(product: IProduct): string {
    return product.categories.map((c) => c.name).join(', ');
  }
}
