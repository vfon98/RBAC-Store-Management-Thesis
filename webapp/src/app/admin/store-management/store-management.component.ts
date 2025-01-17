import { ITableOverviewModel } from './../../core/models/table-overview.model';
import { StoreService } from 'src/app/core/http';
import { NotificationService } from './../../layouts/notification/notification.service';
import { ConfirmModalService } from './../../service/confirm-modal.service';
import { StoreModalService } from './../../service/store-modal.service';
import { Component, OnInit } from '@angular/core';
import { IAgmMarker, IStore } from 'src/app/core/models';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.css'],
})
export class StoreManagementComponent implements OnInit {
  stores: IStore[] = [];
  figures: ITableOverviewModel[] = [];
  agmMarkers: IAgmMarker[] = [];

  constructor(
    private storeService: StoreService,
    private storeModalService: StoreModalService,
    private confirmService: ConfirmModalService,
    private notiService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.fetchStores();
    this.storeService.updateObservable$.subscribe((store: IStore) => {
      const index: number = this.stores.findIndex((s) => s.id === store.id);
      this.stores[index] = store;
      this.fetchStores();
    });
  }

  fetchStores(): void {
    this.storeService.fetchStores().subscribe((stores) => {
      this.stores = stores;
      this.initializeTableOverview(stores);
      this.initializeAgmMarkers(stores);
    });
  }

  initializeTableOverview(stores: IStore[] = []): void {
    this.figures = [
      { title: 'Total store', number: stores.length, extra: '+1 last week' },
      {
        title: 'Still running',
        number: stores?.filter((s) => s.status === 'Open').length,
      },
      {
        title: 'Temporary closed',
        number: stores?.filter((s) => s.status === 'Closed').length,
        extra: 'up to date',
      },
    ];
  }

  initializeAgmMarkers(stores: IStore[] = []): void {
    this.agmMarkers = this.stores.map(store => ({
      latitude: store.latitude,
      longitude: store.longitude,
      label: store.name
    }))
  }

  showDetailsModal(id: number): void {
    this.storeService.fetchById(id).subscribe((store) => {
      this.storeModalService.showDetailsModal(store);
    });
  }

  showUpdateModal(id: number): void {
    this.storeService.fetchById(id).subscribe((store) => {
      this.storeModalService.showUpdateModal(store);
    });
  }

  deleteStore(id: number): void {
    this.confirmService.show().onYes(() => {
      this.storeService.deleteById(id).subscribe(() => {
        this.stores = this.stores.filter((store) => store.id !== id);
        this.notiService.showSuccess('Delete successfully!');
      });
    });
  }
}
