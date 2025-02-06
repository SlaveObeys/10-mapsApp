import { Component } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'alone-counter-alone',
  standalone: true,
  imports: [],
  templateUrl: './counter-alone.component.html',
  styles: ``
})
export class CounterAloneComponent {

  public counter: number = 10;

}
