import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Festival} from "../../../models/festival";
import {ActivatedRoute} from "@angular/router";
import {EditeursService} from "../../../services/editeurs.service";
import {Editeur} from "../../../models/Editeur";
import {Jeux} from "../../../models/Jeux";
import {FestivalsService} from "../../../services/festivals.service";
import {FestivaljsonService} from "../../../services/festivaljson.service";

@Component({
  selector: 'app-editeurs-select',
  templateUrl: './editeurs-select.component.html',
  styleUrls: ['./editeurs-select.component.css']
})
export class EditeursSelectComponent implements OnInit {

  @Input() festival!: Festival | null;
  @Input() currentEditeurs!: Editeur[]

  @Output() selectEditeurEmitter = new EventEmitter<Editeur>();
  @Output() unSelectEditeurEmitter = new EventEmitter<Editeur>();

  constructor(
    private festivalService: FestivaljsonService,
    private editeurService: EditeursService) {}

  editeurs!: Editeur[]

  ngOnInit() {
    console.log("editeurs-select init")
    this.editeurService.getAllEditeurs().subscribe(editeurs => {
      if(!editeurs) return;
      this.editeurs = editeurs;
      this.initJeux();
    })
  }

  onSelect(editeur: Editeur) {
    this.selectEditeurEmitter.emit(editeur);
  }

  onDelete(editeur: Editeur){
    this.editeurService.deleteEditeur(editeur);
    this.unSelectEditeurEmitter.emit(editeur);
  }

  initJeux(){
    for(let i = 0; i < this.editeurs.length; i++){
      const editeur = this.editeurs[i];
      this.editeurService.getJeux(editeur)?.subscribe(jeux => {
        editeur.jeux = jeux;
      })
    }
  }

  jeuxToString(jeux: Jeux[]): string {
    if(!jeux) return "Aucun";
    return jeux.length === 0 ? "Aucun" : this.getJeuxNames(jeux);
  }

  getJeuxNames(jeux: Jeux[]): string {
    const list: string[] = [];
    for(let i = 0; i < jeux.length; i++){
      const jeu = jeux[i];
      list.push(jeu.name);
    }
    return list.toString();
  }

}
