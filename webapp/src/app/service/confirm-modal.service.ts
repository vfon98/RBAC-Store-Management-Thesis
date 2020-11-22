import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ConfirmModalComponent } from './../modal/confirm-modal/confirm-modal.component';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { Injectable } from '@angular/core';
import { NzModalService } from "ng-zorro-antd";

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private nzModalService: NzModalService
  ) {
  }

  show(title?: string): ConfirmModalService {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      containerClass: 'fade bottom',
      class: 'modal-dialog modal-dialog-centered modal-sm',
      data: { title },
    });
    return this;
  }

  onYes(fn: () => any): any {
    this.modalRef.content.action.subscribe(({ value, key }) => {
      if (value === ConfirmModalComponent.YES) {
        fn();
        this.modalRef.hide();
        this.modalRef.content.action.unsubscribe();
      }
    })
  }

  showNzConfirm(onOk: () => void, onCancel?: () => void): any {
    this.nzModalService.confirm({
      nzTitle: '<i>Are you sure to proceed this action?</i>',
      nzContent: '<b class="text-muted">This action might not to be undo.</b>',
      nzOnOk: onOk,
      nzOnCancel: onCancel
    });
  }
}
