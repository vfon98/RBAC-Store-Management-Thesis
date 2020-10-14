import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-button-admin',
  templateUrl: './back-button-admin.component.html',
  styleUrls: ['./back-button-admin.component.css'],
})
export class BackButtonAdminComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
