import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  TransferChange,
  TransferItem,
  TransferSelectChange
} from "ng-zorro-antd";
import { IProduct } from "../../core/models";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import {
  IImportedProduct,
  IImportMultiple
} from "../../core/models/import-multiple.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-nz-import-modal',
  templateUrl: './nz-import-modal.component.html',
  styleUrls: ['./nz-import-modal.component.scss']
})
export class NzImportModalComponent implements OnInit, OnChanges {
  isVisible = false;
  list: TransferItem[] = [];
  storeId: string;

  @Input()
  srcProducts: IProduct[];


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.storeId = params.id;
    })
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

  removeHidden(items: TransferItem[]): TransferItem[] {
    return items.filter(item => !item.hide);
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
    const body: IImportMultiple = new IImportMultiple();
    const importedProducts: IImportedProduct[] = this.list
      .filter(item => item.direction === 'right')
      .map(item => ({
        productId: item.key,
        importedQuantity: item.importedQuantity
      }));

    if (!importedProducts?.length) return;

    body.storeId = this.storeId;
    body.products = importedProducts;

    console.log(body)

    this.resetSelected();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.resetSelected();
    this.isVisible = false;
  }

  filterProducts(input: string, item: TransferItem): boolean {

    const matched = item.title.toLowerCase().includes(input.toLowerCase());
    item.hide = matched;

    return matched;
  }

  resetSelected(): void {
    this.list = this.list.map(item => {
      if (item.direction === 'right')
        item.direction = 'left';

      return item;
    })
  }
}

