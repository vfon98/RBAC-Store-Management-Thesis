import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../core/http";
import { IBestSeller } from "../../core/models/best-seller.model";

@Component({
  selector: 'app-shopping-banner',
  templateUrl: './shopping-banner.component.html',
  styleUrls: ['./shopping-banner.component.css']
})
export class ShoppingBannerComponent implements OnInit {
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      }]
  };

  bestSellerProducts: IBestSeller[] = [];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.fetchTopBestSellers();
  }

  fetchTopBestSellers(): void {
    this.customerService.fetchTopBestSellersProducts()
      .subscribe(bestSellerProducts => {
        this.bestSellerProducts = bestSellerProducts.map((p, index) => {
          p.product.rank = index + 1;
          return p;
        });
        console.log(bestSellerProducts)
      })
  }
}
