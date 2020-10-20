import { Component, Input, OnInit } from '@angular/core';
import {
  MDBModalService,
  MDBModalRef,
} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-wrapper-admin',
  templateUrl: './modal-wrapper-admin.component.html',
  styleUrls: ['./modal-wrapper-admin.component.css'],
})
export class ModalWrapperAdminComponent implements OnInit {
  @Input()
  modalTitle = '';

  constructor(
    private modalService: MDBModalService,
    public modalRef: MDBModalRef
  ) {}

  ngOnInit(): void {}
}
