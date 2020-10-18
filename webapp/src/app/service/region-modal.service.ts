import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from "ng-uikit-pro-standard";
import { IRegion } from "../core/models";
import { RegionDetailsComponent } from "../admin/region-management/region-details/region-details.component";
import { RegionUpdateComponent } from "../admin/region-management/region-update/region-update.component";

@Injectable({
  providedIn: 'root'
})
export class RegionModalService {
  modalDetailRef: MDBModalRef;
  modalUpdateRef: MDBModalRef;
  
  private options = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {},
  };

  constructor(private modalService: MDBModalService) { }

  showDetailModal(region: IRegion): void {
    this.options.data = { region };
    this.modalDetailRef = this.modalService.show(RegionDetailsComponent, this.options);
  }

  showUpdateModal(region: IRegion): void {
    this.options.data = { region };
    this.modalUpdateRef = this.modalService.show(RegionUpdateComponent, this.options);
  }

  hideDetailModal(): void {
    this.modalDetailRef.hide();
  }

  hideUpdateModal(): void {
    this.modalUpdateRef.hide();
  }
}
