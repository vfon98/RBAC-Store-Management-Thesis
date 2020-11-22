import { Component, Input, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models/bar-chart-data.model";

@Component({
  selector: 'app-bar-chart-vertical',
  templateUrl: './bar-chart-vertical.component.html',
  styleUrls: ['./bar-chart-vertical.component.css']
})
export class BarChartVerticalComponent implements OnInit {
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
