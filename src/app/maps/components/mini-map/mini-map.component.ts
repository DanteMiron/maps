import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  @Input()
  lngLat? : [number,number];

  public map? : Map;



  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map div nor found"
    if ( !this.lngLat ) throw "LngLat can't be null"

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=zZakkxJqH4SGaPCJ4A64', // stylesheet location
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo ( this.map )
  }
}
