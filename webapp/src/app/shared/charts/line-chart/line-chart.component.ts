import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";
import { ILineChartData } from "../../../core/models/line-chart-data.model";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input()
  width: number | string;

  @Input()
  height: number | string;

  @Input()
  data: ILineChartData[];

  view: any[];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    this.view = [this.width, this.height];
  }

  ngOnInit(): void {
    console.log("RECEIVED", this.data)
  }

  ngOnChanges() {
    console.log("RECEIVED", this.data)
  }

}
