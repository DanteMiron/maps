import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker,
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);



  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento no fue encontrados';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=zZakkxJqH4SGaPCJ4A64', // stylesheet location
      center: this.currentLngLat,
      zoom: 10 // starting zoom
    });

    this.readFromLocalStorage();
  }

  createMarker(){
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat  = this.map.getCenter();

    this.addMarker(lngLat,color)
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,

    })
      .setLngLat(lngLat)
      .addTo(this.map)
      ;

    this.markers.push( {color, marker} );
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage())
  }

  deleteMarker( index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] = this.markers.map(({color, marker})=>{
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarker ))
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers : PlainMarker[] = JSON.parse(plainMarkersString)

    plainMarkers.forEach(({color, lngLat})=>{
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color)

    })

  }

}
