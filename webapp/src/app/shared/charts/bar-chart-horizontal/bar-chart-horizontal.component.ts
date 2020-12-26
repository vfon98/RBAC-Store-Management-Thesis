import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";

@Component({
  selector: 'app-bar-chart-hirizontal',
  templateUrl: './bar-chart-hirizontal.component.html',
  styleUrls: ['./bar-chart-hirizontal.component.scss']
})
export class BarChartHorizontalComponent implements OnInit, OnChanges {
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
    return;

    if (!this.data || !this.data.length) return;

    // this.data = this.data.map(d => ({ ...d, value: 0 }))

    const dataClone = [...this.data].reverse();
    this.data = [];
    for (let i = 0; i < dataClone.length; i++) {
      await this.debounce();
      this.data = [dataClone[i], ...this.data]
      // this.data[i].value = dataClone[i].value;
      console.log(this.data)
    }
  }

  async debounce(): Promise<unknown> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 400)
    })
  }

}
