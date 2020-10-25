import { Component, ElementRef, OnInit, Input } from '@angular/core';

export class IManagerTableStatistic {
  title = 'Default title';
  value = 0;
  prefix?: string | ElementRef;
  suffix?: string;
  valueColor?: string;
}

@Component({
  selector: 'app-shared-table-statistic',
  templateUrl: './shared-table-statistic.component.html',
  styleUrls: ['./shared-table-statistic.component.css']
})
export class SharedTableStatisticComponent implements OnInit {
  @Input()
  statistics: IManagerTableStatistic[] = [];
  
  successColor = '#3F8600';
  dangerColor = '#CF1322';

  constructor() { }

  ngOnInit(): void {
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    this.statistics.forEach((s, i) => {
      switch (s.valueColor) {
        case 'success':
          this.statistics[i].valueColor = this.successColor;
          break;
        case 'danger':
          this.statistics[i].valueColor = this.dangerColor;
          break;
      }

    })
  }

}
