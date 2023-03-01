import { Component, Input, OnInit } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.css']
})
export class FestivalsListComponent implements OnInit {

  @Input() festivals!: Festival[]
  @Output() selectedFestivalEmitter = new EventEmitter<Festival>();

 

  constructor(public messageService : MessageService){}

  ngOnInit(): void {
    this.messageService.log("Il y a "+this.festivals.length+" festivals !")
  }

  selectNewFestival(festival: Festival) {
    this.selectedFestivalEmitter.emit(festival);
  }
}
