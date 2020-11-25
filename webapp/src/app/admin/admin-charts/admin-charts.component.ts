import { Component, OnInit } from '@angular/core';
import { ChartService } from "../../core/http/chart.service";
import { IBarChartData } from "../../core/models";

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {
  topSaleData: IBarChartData[] = [];
  storeRevenueByQuantity: IBarChartData[] = [];
  storeRevenueByPrice: IBarChartData[] = [];

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.fetchTopSaleProductsData();
    this.fetchStoreRevenues();
  }

  fetchTopSaleProductsData(): void {
    this.chartService.fetchTopSaleProducts().subscribe(topSales => {
      this.topSaleData = topSales.map(topSale => ({
        name: topSale.productName,
        value: topSale.total
      }));
    });
  }

  fetchStoreRevenues(): void {
    this.chartService.fetchStoreRevenues().subscribe(storeRevenues => {
      this.storeRevenueByQuantity = storeRevenues.map(response => ({
        name: response.storeName,
        value: response.totalQuantity
      }));

      this.storeRevenueByPrice = storeRevenues.map(response => ({
        name: response.storeName,
        value: response.totalRevenue
      }))
    })
  }

}
