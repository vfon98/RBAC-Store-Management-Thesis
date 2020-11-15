import { Component, Input, OnChanges, OnInit } from '@angular/core';
import CONSTANTS, {
  AgmMapType,
  AgmZoom
} from "../../../core/constants/common.constants";
import { IAgmMarker } from "../../../core/models";
import { NgbTypeaheadConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-custom-agm-map',
  templateUrl: './custom-agm-map.component.html',
  styleUrls: ['./custom-agm-map.component.css']
})
export class CustomAgmMapComponent implements OnInit, OnChanges {
  @Input() latitude;
  @Input() longitude;
  position: any;

  @Input() width: number;
  @Input() height: number;
  @Input() mapTypeId = AgmMapType.NORMAL;
  // @Input() zoom = AgmZoom.REGION;
  @Input() zoom = AgmZoom.WORLD;

  @Input()
  markers: IAgmMarker[] = [];


  constructor() {}

  ngOnInit(): void {
    const timer = setInterval(() => {
      if (this.zoom < 8) {
        this.zoom++;
      } else {
        clearInterval(timer);
      }
    }, 200)
  }

  ngOnChanges() {
    if (!this.latitude || !this.longitude) {
      this.latitude  = CONSTANTS.DEFAULT_LATITUDE;
      this.longitude = CONSTANTS.DEFAULT_LONGITUDE;
    }
  }

  getCurrentGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position;
      })
    }
  }
}
