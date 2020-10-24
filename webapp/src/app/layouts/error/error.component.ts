import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage?: string;
  nzStatus: string;
  nzTitle: string;
  nzSubTitle: string;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data.errorMessage) {
        this.errorMessage = data.errorMessage;
        this.nzStatus = data.nzStatus ?? '500';
        this.nzTitle = data.nzTitle ?? '500';
        this.nzSubTitle = data.nzSubTitle ?? 'Unknown error!';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
