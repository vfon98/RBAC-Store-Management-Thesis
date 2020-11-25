import { Component, Input, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";

@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styleUrls: ['./pie-grid-chart.component.css']
})
export class PieGridChartComponent implements OnInit {
  @Input()
  width: number | string;

  @Input()
  height: number | string;

  @Input()
  data: IBarChartData[];

  view: any[];

  constructor() {
    this.view = [this.width, this.height];
  }

  ngOnInit(): void {
  }

}
