import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProductBody } from 'src/app/core/models';
import { ProductService } from 'src/app/core/http/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  constructor(
    private location: Location,
    private productService: ProductService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {}

  handleSubmit(body: IProductBody): void {
    this.productService.save(body).subscribe(() => {
      this.notiService.showSuccess();
      this.back();
    });
  }

  back(): void {
    this.location.back();
  }
}
