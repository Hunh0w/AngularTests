import { Component, EventEmitter, Output } from '@angular/core';
import { Festival } from './models/festival';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'festivals-app';
  festivals = [
    new Festival("festival1"),
    new Festival("festival2"),
    new Festival("festival3")
  ];

  festivalSelected!: Festival

  selectFestival(festival: Festival) {
    this.festivalSelected = festival
  }
}
