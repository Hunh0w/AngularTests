import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Festival } from './models/festival';
import {FestivaljsonService} from "./services/festivaljson.service";
import {Observable} from "rxjs";
import {Editeur} from "./models/Editeur";
import {EditeursService} from "./services/editeurs.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'festivals-app';

  constructor(private festivalsService: FestivaljsonService,
              private editeursService: EditeursService) {}

  festivals!: Observable<Festival[]>

  festivalSelected!: Festival | null
  currentEditeurs!: Editeur[]

  ngOnInit() {
    this.festivals = this.festivalsService.getAllFestivals();
  }

  selectFestival(festival: Festival) {
    this.festivalSelected = festival
    this.editeursService.getEditeurs(festival).subscribe(editeurs => {
      this.currentEditeurs = editeurs;
    })
  }

  selectEditeur(editeur: Editeur) {
    if(!this.festivalSelected || !editeur.id) return;
    if(this.festivalSelected.editeurs.includes(editeur.id)) return;
    console.log("emit!!!")
    this.festivalSelected.editeurs.push(editeur.id);
    this.currentEditeurs.push(editeur);
    this.festivalsService.addUpdateFestival(this.festivalSelected);
  }

  unSelectEditeur(editeur: Editeur) {
    if(!editeur.id || !this.festivalSelected) return;
    if(!this.festivalSelected.editeurs.includes(editeur.id)) return;
    this.currentEditeurs = this.currentEditeurs.filter(editeur_current => editeur_current.id !== editeur.id)
    this.festivalSelected.editeurs = (this.currentEditeurs.map(editeur_current => editeur_current.id)??[]) as string[];
    this.festivalsService.addUpdateFestival(this.festivalSelected);
  }

  deleteFestival(festival: Festival){
    this.festivalSelected = null;
    this.festivalsService.deleteFestival(festival)
  }

  onCreateEditeur(editeur: Editeur){
    this.currentEditeurs.push(editeur);
  }
}
