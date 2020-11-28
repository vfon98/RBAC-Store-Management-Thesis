import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table-wrapper-manager',
  templateUrl: './table-wrapper-manager.component.html',
  styleUrls: ['./table-wrapper-manager.component.css']
})
export class TableWrapperManagerComponent implements OnInit {
  @Input()
  tableData: Record<string, object>[];

  @ViewChild('nzTable')
  public nzTable: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

}
