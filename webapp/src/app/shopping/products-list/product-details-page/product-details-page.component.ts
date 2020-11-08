import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../core/http";
import {IProduct} from "../../../core/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {
  product: IProduct;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchProductDetails(params.productId);
    })
  }

  fetchProductDetails(productId: number): void {
    this.customerService.fetchProductDetails(productId)
      .subscribe(product => {
        this.product = product;
      }, err => {
        console.error("Error", err);
        this.router.navigate(['/shopping']);
      });
  }
}


