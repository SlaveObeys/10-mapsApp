import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'minimap-mini-map',
  templateUrl: './mini-map.component.html',
  styles: ``
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public marker?: Marker;

  @Input()
  lngLat?: [number, number];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'DivMap not found';
    if (!this.lngLat) throw ('lngLat is required');

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14,
      interactive: false
    });

    this.marker = new Marker({
      color: 'red',
      draggable: false
    }).setLngLat(this.lngLat).addTo(this.map);


  }

}
