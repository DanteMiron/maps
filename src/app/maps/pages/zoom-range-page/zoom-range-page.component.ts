import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, numberAttribute } from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap? : ElementRef;

  public zoom : number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);
  public lng: number = this.currentLngLat.lng
  public lat: number = this.currentLngLat.lat


  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento no fue encontrados';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=zZakkxJqH4SGaPCJ4A64', // stylesheet location
      center: this.currentLngLat,
      zoom: this.zoom // starting zoom
    });

    this.mapListeners();

  }

  ngOnDestroy(): void {
    this.map?.remove();
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

    this.map.on('move', ()=>{
      this.currentLngLat = this.map!.getCenter();
      this.lng = this.currentLngLat.lng
      this.lat = this.currentLngLat.lat
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
