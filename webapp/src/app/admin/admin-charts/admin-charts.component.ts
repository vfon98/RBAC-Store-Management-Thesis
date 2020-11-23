import { Component, OnInit } from '@angular/core';
import { ChartService } from "../../core/http/chart.service";
import { IBarChartData } from "../../core/models";

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {
  topSaleData: IBarChartData[]  = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.fetchTopSaleProductsData();
  }

  fetchTopSaleProductsData(): void {
    this.chartService.fetchTopSaleProductsByStoreId().subscribe(topSales => {
      this.topSaleData = topSales.map(topSale => ({
        name: topSale.productName,
        value: topSale.total
      }));

      console.log(this.topSaleData)
    });
  }
}
