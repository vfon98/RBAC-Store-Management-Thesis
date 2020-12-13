import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IBarChartData } from "../../../core/models";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {
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

  async ngOnChanges(): Promise<unknown> {
    if (!this.data || !this.data.length) return;

    const dataClone = [...this.data].reverse();
    this.data = [];
    for (let i = 0; i < dataClone.length; i++) {
      await this.pushAsync(dataClone[1]);
      this.data = [dataClone[i], ...this.data]
      console.log(this.data)
    }
  }

  async pushAsync(record: any): Promise<unknown> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 400)
    })
  }

}
