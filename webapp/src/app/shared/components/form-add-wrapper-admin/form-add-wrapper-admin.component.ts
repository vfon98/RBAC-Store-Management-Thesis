import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-add-wrapper-admin',
  templateUrl: './form-add-wrapper-admin.component.html',
  styleUrls: ['./form-add-wrapper-admin.component.css']
})
export class FormAddWrapperAdminComponent implements OnInit {
  @Input()
  title = 'Default title';

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
