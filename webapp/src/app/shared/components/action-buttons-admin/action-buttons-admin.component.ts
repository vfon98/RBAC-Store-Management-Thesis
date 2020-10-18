import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons-admin',
  templateUrl: './action-buttons-admin.component.html',
  styleUrls: ['./action-buttons-admin.component.scss']
})
export class ActionButtonsAdminComponent implements OnInit {
  @Output()
  onDetail = new EventEmitter();

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
