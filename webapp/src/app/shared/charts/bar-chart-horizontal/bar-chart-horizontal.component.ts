import { Component, Input, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";

@Component({
  selector: 'app-bar-chart-hirizontal',
  templateUrl: './bar-chart-hirizontal.component.html',
  styleUrls: ['./bar-chart-hirizontal.component.css']
})
export class BarChartHorizontalComponent implements OnInit {
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
