import { AfterViewInit, Component, ElementRef, ViewChild, numberAttribute } from '@angular/core';
import { Map } from 'maplibre-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit {

  @ViewChild('map') divMap? : ElementRef;

  public zoom : number = 10;
  public map?: Map;


  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento no fue encontrados';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=zZakkxJqH4SGaPCJ4A64', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    });

    this.mapListeners();

  }

  mapListeners(){
    if (!this.map) throw "El mapa no esta inicializado"

    this.map.on('zoom', (ev)=>{
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev)=>{
      if (this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);

    })

  }

  zoomOut(){
    this.map!.zoomOut();
  }

  zoomIn(){
    this.map!.zoomIn();
  }

  zoomChanged(value:string){
    this.zoom = Number(value)
    this.map?.zoomTo( this.zoom );
  }
}
