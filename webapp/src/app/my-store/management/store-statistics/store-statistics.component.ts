import { Component, OnInit } from '@angular/core';
import { ChartService } from "../../../core/http/chart.service";
import { IBarChartData } from "../../../core/models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-store-statistics',
  templateUrl: './store-statistics.component.html',
  styleUrls: ['./store-statistics.component.css']
})
export class StoreStatisticsComponent implements OnInit {
  single: any[];

  topSaleData: IBarChartData[];
  storeId: string;

  constructor(
    private chartService: ChartService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => {
      this.storeId = params.id;
    })
  }

  ngOnInit(): void {
    this.fetchTopSalesProductsByStoreId();
  }

  fetchTopSalesProductsByStoreId(): void {
    this.chartService.fetchTopSaleProductsByStoreId(this.storeId).subscribe(topSales => {
      this.topSaleData = topSales.map(elem => ({
        name: elem.productName,
        value: elem.total
      }))
    })
  }
}
