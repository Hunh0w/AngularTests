import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Festival } from './models/festival';
import {FestivaljsonService} from "./services/festivaljson.service";
import {Observable} from "rxjs";
import {Editeur} from "./models/Editeur";
import {EditeursService} from "./services/editeurs.service";
import {Jeux} from "./models/Jeux";

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
      this.currentEditeurs.forEach(editeur => {
        this.editeursService.getJeux(editeur)?.subscribe(jeux => {
          editeur.jeux = jeux;
        })
      })
    })
  }

  selectEditeur(editeur: Editeur) {
    if(!this.festivalSelected || !editeur.id) return;
    if(this.festivalSelected.editeurs.includes(editeur.id)) return;
    this.currentEditeurs = [...this.currentEditeurs, editeur]
    this.festivalSelected.editeurs = (this.currentEditeurs.map(editeur => editeur.id)??[]) as string[];
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
    if(this.currentEditeurs){
      this.currentEditeurs.push(editeur);
    }
  }

  onUpdateEditeur(obj: {editeur: Editeur, jeu: Jeux}){
    const jeux = obj.editeur.jeux??[];

    let existingJeu = jeux.find(jeu => jeu.name.toLowerCase() === obj.jeu.name.toLowerCase());
    if(existingJeu && this.currentEditeurs.map(editeur => editeur.id).includes(obj.editeur.id)){
      const id = existingJeu.id;
      obj.jeu.id = id;
      this.editeursService.addUpdateJeu(obj.editeur, obj.jeu);

      const currentEditeurs = this.currentEditeurs;

      for(let i = 0; i < currentEditeurs.length; i++){
        if(currentEditeurs[i].id == obj.editeur.id)
          currentEditeurs[i].jeux = [...currentEditeurs[i].jeux, obj.jeu];
      }

    }else
      this.createJeu(obj.editeur, obj.jeu)


  }

  private createJeu(editeur: Editeur, jeu: Jeux){
    this.editeursService.addJeu(editeur, jeu);
    editeur.jeux = [...editeur.jeux, jeu]
    const currentEditeurs = this.currentEditeurs;
    for(let i = 0; i < currentEditeurs.length; i++){
      const currentEditeur = currentEditeurs[i];
      if(currentEditeur.id === editeur.id)
        currentEditeurs[i] = editeur;
    }
  }

  onDeleteJeu(obj: any){
    const currentEditeurs = this.currentEditeurs;
    for(let i = 0; i < currentEditeurs.length; i++){
      if(currentEditeurs[i].id == obj.editeur.id)
        currentEditeurs[i].jeux = currentEditeurs[i].jeux.filter(jeu => jeu.id !== obj.jeu.id);
    }
  }
}
