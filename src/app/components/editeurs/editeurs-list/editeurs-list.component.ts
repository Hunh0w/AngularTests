import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Editeur} from "../../../models/Editeur";
import {EditeursService} from "../../../services/editeurs.service";
import {Jeux} from "../../../models/Jeux";
import {Festival} from "../../../models/festival";
import {ActivatedRoute} from "@angular/router";
import {FestivalsService} from "../../../services/festivals.service";
import {FestivaljsonService} from "../../../services/festivaljson.service";

@Component({
  selector: 'app-editeurs-list',
  templateUrl: './editeurs-list.component.html',
  styleUrls: ['./editeurs-list.component.css']
})
export class EditeursListComponent implements OnInit {

  @Input() festival!: Festival;
  @Input() currentEditeurs!: Editeur[]
  @Output() unSelectEmitter = new EventEmitter<Editeur>();

  constructor(
    private route: ActivatedRoute,
    private festivalService: FestivaljsonService,
    private editeurService: EditeursService) {}

  ngOnInit() {
    console.log("editeurs-list init")
    if(this.route.snapshot.url[0].path === "editeurs"){
      this.editeurService.getAllEditeurs().subscribe(editeurs => {
        this.currentEditeurs = editeurs;
        this.initJeux();
      })
      return;
    }

    this.editeurService.getEditeurs(this.festival).subscribe(editeurs => {
      if(!editeurs) return;
      this.currentEditeurs = editeurs;
      this.initJeux();
    })
  }

  initJeux(){
    for(let i = 0; i < this.currentEditeurs.length; i++){
      const editeur = this.currentEditeurs[i];
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

  onDelete(editeur: Editeur){
    this.unSelectEmitter.emit(editeur);
  }

}
