import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map') divMap? : ElementRef;


  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento no fue encontrados';

    const map = new Map({
      container: this.divMap?.nativeElement,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=zZakkxJqH4SGaPCJ4A64', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });

  }

}
