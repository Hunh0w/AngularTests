import { Component, Input, OnInit } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';
import { Output, EventEmitter } from '@angular/core';
import {FestivaljsonService} from "../../../services/festivaljson.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent implements OnInit {

  @Input() festivalsAsync!: Observable<Festival[]>
  @Output() selectedFestivalEmitter = new EventEmitter<Festival>();

  public festivals!: Festival[]

  constructor(
    public messageService: MessageService,
    private festivalService: FestivaljsonService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    if(this.route.snapshot.url[0].path === "festivals"){
      this.festivalService.getAllFestivals().subscribe((festivals) => {
        this.festivals = festivals;
      })
      return;
    }

    this.festivalsAsync.subscribe((festivals) => {
      this.festivals = festivals;
      this.messageService.log("Il y a "+this.festivals.length+" festivals !")
    });
  }

  selectNewFestival(festival: Festival) {
    this.selectedFestivalEmitter.emit(festival);
  }
}
