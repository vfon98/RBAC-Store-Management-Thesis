import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MDBModalService, ModalContainerComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-wrapper-admin',
  templateUrl: './modal-wrapper-admin.component.html',
  styleUrls: ['./modal-wrapper-admin.component.css']
})
export class ModalWrapperAdminComponent implements OnInit {
  @Input()
  modalTitle = '';
  
  @ViewChild('basicModal')
  activeModal: ModalContainerComponent;
  
  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  hideModal(): void {
    this.activeModal.hide();
  }
}
