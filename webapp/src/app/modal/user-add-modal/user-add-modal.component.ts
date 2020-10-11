import { NotificationService } from './../../layouts/notification/notification.service';
import { StoreService, StaffService } from  'src/app/core/http';
import { UserModalService } from './../../service/user-modal.service';
import { FormType } from '../../admin/user-management/user-add/user-form.component';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.css'],
})
export class UserAddModalComponent implements OnInit {
  user: IUser;
  storeId: number;
  type = FormType;

  constructor(
    private userModalService: UserModalService,
    private staffService: StaffService,
    private storeService: StoreService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {}

  handleSubmit(user: IUser): void {
    this.storeService.addStaffToStore(user).subscribe((addedUser) => {
      this.staffService.userAddSubject.next(addedUser);
      this.hideModal();
      this.notiService.showSuccess('Added staff to store');
    });
  }

  hideModal(): void {
    this.userModalService.hideAddModal();
  }
}
