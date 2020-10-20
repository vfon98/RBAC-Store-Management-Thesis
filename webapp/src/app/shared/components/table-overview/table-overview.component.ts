import { ITableOverviewModel } from '../../../core/models/table-overview.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss'],
})
export class TableOverviewComponent implements OnInit {
  @Input()
  figures: ITableOverviewModel[];

  date = new Date();

  constructor() {}

  ngOnInit(): void {
    if (!this.figures) {
      this.figures = [
        { title: 'Total records', number: 35, extra: 'up to date' },
        { title: 'Total revenue', number: 70, extra: null },
        { title: 'Total records', number: 35, extra: '+1 today' },
      ];
    }
  }
}
