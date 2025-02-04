import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Marker } from 'mapbox-gl';
import { Map } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styles: ``
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-70.68469762997894, -33.54428859464333);

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'DivMap not found';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Ignacio Bilbao';

    const marker = new Marker({
      color: 'red',
      element: markerHtml,
    }).setLngLat(this.currentLngLat).addTo(this.map);

    this.readFromLocalStorage();

  }

  createMaker(): void {

    if (!this.map) throw 'Map not found';

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string = 'red'): void {
    if (!this.map) throw 'Map not found';

    const marker = new Marker({
      color: color,
      draggable: true,
    }).setLngLat(lngLat).addTo(this.map);

    this.markers.push({
      color,
      marker
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker(i: number): void {
    this.markers[i].marker.remove();
    this.markers.splice(i, 1);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    const plainMarkers: PlainMarker[] = this.markers.map((({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    }));

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));

  }

  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {

      const [lng, lat] = lngLat;
      const lngLats = new LngLat(lng, lat);

      this.addMarker(lngLats, color);
    })
  }

}
