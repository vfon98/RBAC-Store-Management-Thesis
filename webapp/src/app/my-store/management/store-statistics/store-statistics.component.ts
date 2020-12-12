import { Component, OnInit } from '@angular/core';
import { ChartService, IImportedData } from "../../../core/http/chart.service";
import { IBarChartData } from "../../../core/models";
import { ActivatedRoute } from "@angular/router";
import { ILineChartData } from "../../../core/models/line-chart-data.model";

@Component({
  selector: 'app-store-statistics',
  templateUrl: './store-statistics.component.html',
  styleUrls: ['./store-statistics.component.css']
})
export class StoreStatisticsComponent implements OnInit {
  single: any[];

  topSaleData: IBarChartData[];
  storeId: string;

  importedData: ILineChartData[] = [];

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
    this.fetchImportedLineChartData();
  }

  fetchTopSalesProductsByStoreId(): void {
    this.chartService.fetchTopSaleProductsByStoreId(this.storeId).subscribe(topSales => {
      this.topSaleData = topSales.map(elem => ({
        name: elem.productName,
        value: elem.total
      }))
    })
  }

  fetchImportedLineChartData(): void {
    this.chartService.fetchImportedLineChartData().subscribe(res => {
      const series: any = res.map(elem => ({
        name: new Date(elem.date).toLocaleDateString(),
        value: elem.totalImported
      }));
      this.importedData = [{
        name: 'Imported quantity',
        series: series
      }]
      console.log(this.importedData)
    })
  }
}
