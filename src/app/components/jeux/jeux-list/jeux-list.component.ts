import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Editeur} from "../../../models/Editeur";
import {EditeursService} from "../../../services/editeurs.service";
import {Jeux} from "../../../models/Jeux";

@Component({
  selector: 'app-jeux-list',
  templateUrl: './jeux-list.component.html',
  styleUrls: ['./jeux-list.component.css']
})
export class JeuxListComponent implements OnInit {

  @Input() editeurId!: string
  @Input() currentEditeurs!: Editeur[]
  @Output() deleteJeuEmitter = new EventEmitter<any>();

  constructor(private editeurService: EditeursService) {
  }

  ngOnInit() {}

  hasJeux(){
    const editeur = this.getEditeur(this.editeurId);
    return (editeur && editeur?.jeux && editeur?.jeux.length > 0)
  }

  getEditeur(id: string): Editeur | undefined {
    if(!this.currentEditeurs) return undefined;
    for(let i = 0; i < this.currentEditeurs.length; i++){
      const editeur = this.currentEditeurs[i];
      if(editeur.id === id) return editeur;
    }
    return undefined;
  }

  onDelete(jeu: Jeux){
    const editeur = this.getEditeur(this.editeurId);
    if(!editeur) return;
    this.editeurService.deleteJeu(editeur, jeu);
    this.deleteJeuEmitter.emit({editeur: editeur, jeu: jeu})
  }

}
