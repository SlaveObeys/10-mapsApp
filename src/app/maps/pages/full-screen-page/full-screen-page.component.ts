import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styles: ``
})
export class FullScreenPageComponent implements OnInit, AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'DivMap not found';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
