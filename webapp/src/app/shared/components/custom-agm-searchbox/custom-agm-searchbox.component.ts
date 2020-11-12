import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import PlaceResult = google.maps.places.PlaceResult;
import { NgbTypeaheadConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-custom-agm-searchbox',
  templateUrl: './custom-agm-searchbox.component.html',
  styleUrls: ['./custom-agm-searchbox.component.css']
})
export class CustomAgmSearchboxComponent implements OnInit {
  @ViewChild('agmSearch')
  public agmSearchElement: ElementRef;

  @Output() onGeolocationChanged = new EventEmitter<PlaceResult[]>();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private typeaheadConfig: NgbTypeaheadConfig
  ) {
    this.typeaheadConfig.container = 'body';
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      let agmSearchbox = new google.maps.places.SearchBox(this.agmSearchElement.nativeElement);
      agmSearchbox.addListener('places_changed', () => {
        this.ngZone.run(() => {
          const places: PlaceResult[] = agmSearchbox.getPlaces();
          if (!places?.length || !places[0].geometry) return;

          console.log("PLACES", places[0])
          this.onGeolocationChanged.emit(places);
        })
      })
    })
  }

}
