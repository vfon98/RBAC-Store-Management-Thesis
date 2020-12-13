import { Component, Input, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input()
  width: number | string;

  @Input()
  height: number | string;

  @Input()
  data: IBarChartData[];

  @Input()
  scheme: string;

  view: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    this.view = [this.width, this.height];
  }

  ngOnInit(): void {
  }

}
