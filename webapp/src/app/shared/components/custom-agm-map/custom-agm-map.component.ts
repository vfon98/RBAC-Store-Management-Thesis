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

  hasDefault = false;
  myPos: IAgmMarker;


  constructor() {}

  ngOnInit(): void {
    const timer = setInterval(() => {
      if (this.zoom < 8) {
        this.zoom++;
      } else {
        clearInterval(timer);
      }
    }, 200)

    this.setDefaultLocation();
    this.getCurrentGeolocation();
  }

  ngOnChanges() {
    this.setDefaultLocation();
  }

  setDefaultLocation(): void {
    if (!this.latitude || !this.longitude) {
      this.latitude  = CONSTANTS.DEFAULT_LATITUDE;
      this.longitude = CONSTANTS.DEFAULT_LONGITUDE;
      console.log("SET DEFAULT LOCATION FOR AGM");
    }
    if (!this.hasDefault && this.markers?.length) {
      this.latitude = this.markers[0].latitude;
      this.longitude = this.markers[0].longitude;
      this.hasDefault = true;
    }
  }

  getCurrentGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position;
        this.myPos = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          label: 'You'
        }
      })
    }
  }
}
