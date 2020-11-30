import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import { NzTableComponent } from "ng-zorro-antd";

@Component({
  selector: 'app-table-wrapper-manager',
  templateUrl: './table-wrapper-manager.component.html',
  styleUrls: ['./table-wrapper-manager.component.css']
})
export class TableWrapperManagerComponent implements OnInit, OnChanges {
  @Input()
  tableData: Record<string, object>[];

  @ViewChild('nzTable')
  public nzTable: NzTableComponent;

  public data = [];

  constructor() {
    console.log(this.nzTable)
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.tableData && Array.isArray(this.tableData)) {
      this.data = [...this.nzTable.data];
      console.log(this.nzTable)
      console.log("Data", this.nzTable.nzData)
    }
  }

}
