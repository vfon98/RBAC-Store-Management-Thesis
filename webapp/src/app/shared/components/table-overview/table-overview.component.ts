import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  date = new Date();
  figures: { title: string, number: number, extra?: any }[] = [
    { title: 'Total records', number: 35, extra: 'up to date' },
    { title: 'Total revenue', number: 70, extra: null },
    { title: 'Total records', number: 35, extra: '+1 today' }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
