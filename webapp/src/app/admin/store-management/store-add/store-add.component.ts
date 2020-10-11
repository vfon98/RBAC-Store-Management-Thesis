import { IStore } from 'src/app/core/models';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { StoreService } from 'src/app/core/http';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css'],
})
export class StoreAddComponent implements OnInit {
  constructor(
    private location: Location,
    private storeService: StoreService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  handleSubmit(store: IStore): void {
    console.log(store);
    this.storeService.save(store).subscribe(() => {
      this.notiService.showSuccess();
      this.back();
    });
  }
}
