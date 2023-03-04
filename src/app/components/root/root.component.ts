import {Component, OnInit} from '@angular/core';
import {Festival} from "../../models/festival";
import {FestivalsListComponent} from "../festival/festivals-list/festivals-list.component";
import {FestivalDetailsComponent} from "../festival/festival-details/festival-details.component";
import {MessageComponent} from "../shared/message/message.component";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit{
  constructor() {}

  ngOnInit() {

  }

}
