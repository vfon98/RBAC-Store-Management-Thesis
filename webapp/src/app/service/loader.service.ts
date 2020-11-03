import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  show(): void {
    this.ngxSpinnerService.show();
  }

  hide(): void {
    this.ngxSpinnerService.hide();
  }

}
