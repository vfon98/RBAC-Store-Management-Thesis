import { Component, OnInit } from '@angular/core';
import { ChartService } from "../../../core/http/chart.service";
import { IBarChartData } from "../../../core/models";

@Component({
  selector: 'app-store-statistics',
  templateUrl: './store-statistics.component.html',
  styleUrls: ['./store-statistics.component.css']
})
export class StoreStatisticsComponent implements OnInit {
  single: any[];

  topSaleData: IBarChartData[];

  constructor(private chartService: ChartService) {
    Object.assign(this, { single: [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      },
      {
        "name": "France",
        "value": 7200000
      }
    ] });
  }

  ngOnInit(): void {
    this.fetchTopSalesProductsByStoreId();
  }

  fetchTopSalesProductsByStoreId(): void {
    this.chartService.fetchTopSaleProductsByStoreId().subscribe(topSales => {
      this.topSaleData = topSales.map(elem => ({
        name: elem.productName,
        value: elem.total
      }))
    })
  }
}
