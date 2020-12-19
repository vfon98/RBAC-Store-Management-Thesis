import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  TransferChange,
  TransferItem,
  TransferSelectChange
} from "ng-zorro-antd";
import { IProduct } from "../../core/models";
import { IImportedProduct } from "../../core/models/import-multiple.model";
import { ActivatedRoute } from "@angular/router";
import { ProductService, StoreService } from "../../core/http";

@Component({
  selector: 'app-nz-import-modal',
  templateUrl: './nz-import-modal.component.html',
  styleUrls: ['./nz-import-modal.component.scss']
})
export class NzImportModalComponent implements OnInit, OnChanges {
  isVisible = false;
  list: TransferItem[] = [];
  storeId: string;
  isLoading = false;

  numberComparator: any = (a: any, b: any) => a?.remainQuantity - b?.remainQuantity;
  stringComparator: any = (a: any, b: any) => a?.title.localeCompare(b?.title);

  @Input()
  srcProducts: IProduct[];


  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private productService: ProductService,
  ) {}

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
    const importedProducts: IImportedProduct[] = this.list
      .filter(item => item.direction === 'right')
      .map(item => ({
        productId: item.key,
        importedQuantity: item.importedQuantity
      }));

    if (!importedProducts?.length) return;

    console.log(importedProducts)
    this.isLoading = true;
    this.storeService.importMultipleProducts(this.storeId, importedProducts)
      .subscribe(res => {
        this.productService.changedSubject.next();
        this.isVisible = false;
        this.resetSelected();
        this.isLoading = false;
      });

  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetSelected();
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

