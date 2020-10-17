import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-update-wrapper-admin',
  templateUrl: './modal-update-wrapper-admin.component.html',
  styleUrls: ['./modal-update-wrapper-admin.component.css']
})
export class ModalUpdateWrapperAdminComponent implements OnInit {
  @ViewChild('activeModal', { static: true })
  activeModal: ModalDirective;
  

  constructor() { }

  ngOnInit(): void {
  }

  hideModal(): void {
    this.activeModal.hide();
  }
}
