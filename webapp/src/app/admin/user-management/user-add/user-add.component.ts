import { IUser } from './../../../core/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormType } from 'src/app/admin/user-management/user-add/user-form.component';
import { NotificationService } from './../../../layouts/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StaffService } from 'src/app/core/http';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {
  type = FormType;

  constructor(
    private location: Location,
    private staffService: StaffService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  handleSubmit(user: IUser): void {
    this.staffService.saveFromAdmin(user).subscribe((addedUser) => {
      this.notiService.showSuccess('Added successfully!');
      this.back();
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.notiService.showError('Existed username');
      }
    });
  }
}
