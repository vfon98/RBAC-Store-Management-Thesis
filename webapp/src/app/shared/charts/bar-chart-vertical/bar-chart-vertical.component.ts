import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models/bar-chart-data.model";

@Component({
  selector: 'app-bar-chart-vertical',
  templateUrl: './bar-chart-vertical.component.html',
  styleUrls: ['./bar-chart-vertical.component.css']
})
export class BarChartVerticalComponent implements OnInit, OnChanges {
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

  async ngOnChanges(): Promise<unknown> {
    if (!this.data || !this.data.length) return;

    const dataClone = [...this.data];
    this.data = [];
    for (let i = 0; i < dataClone.length; i++) {
      await this.pushAsync();
      this.data = [...this.data, dataClone[i]];
      console.log(this.data)
    }
  }

  async pushAsync(): Promise<unknown> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300)
    })
  }

}
