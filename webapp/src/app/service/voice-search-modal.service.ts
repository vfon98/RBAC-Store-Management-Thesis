import { Injectable } from '@angular/core';
import { DEFAULT_OPTIONS } from "../core/constants/modal.constants";
import { MDBModalRef, MDBModalService } from "ng-uikit-pro-standard";
import { ProductVoiceSearchModalComponent } from "../modal/product-voice-search-modal/product-voice-search-modal.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoiceSearchModalService {
  modalRef: MDBModalRef;

  options = DEFAULT_OPTIONS;

  confirm$ = new BehaviorSubject<string>(null);
  cancel$ = new BehaviorSubject<string>(null);

  constructor(private modalService: MDBModalService) { }

  show(): void {
    this.modalRef = this.modalService.show(ProductVoiceSearchModalComponent, this.options);
  }

  hide(): void {
    this.modalRef.hide();
  }

  emitConfirm(text: string): void {
    this.confirm$.next(text);
  }

  emitCancel(text: string): void {
    this.cancel$.next(text);
  }
}
