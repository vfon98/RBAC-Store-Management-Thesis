import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  TransferChange,
  TransferItem,
  TransferSelectChange
} from "ng-zorro-antd";
import { IProduct } from "../../core/models";

@Component({
  selector: 'app-nz-import-modal',
  templateUrl: './nz-import-modal.component.html',
  styleUrls: ['./nz-import-modal.component.scss']
})
export class NzImportModalComponent implements OnInit, OnChanges {
  isVisible = false;
  list: TransferItem[] = [];

  @Input()
  srcProducts: IProduct[];


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.srcProducts)
    this.list = this.srcProducts.map(product => ({
      key: product.id,
      checked: false,
      title: product.name,
      img: product?.images[0]?.secureUrl,
      disabled: false,
      remainQuantity: product.quantity,
      importedQuantity: 1
    }))
  }

  showModal(): void {
    this.isVisible = true;
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: TransferChange): void {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

