import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Festival} from "../../../models/festival";
import {Editeur} from "../../../models/Editeur";
import {EditeursService} from "../../../services/editeurs.service";
import {Jeux} from "../../../models/Jeux";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsernameValidator} from "../../../validators/name.validator";

@Component({
  selector: 'app-jeux-create',
  templateUrl: './jeux-create.component.html',
  styleUrls: ['./jeux-create.component.css']
})
export class JeuxCreateComponent implements OnInit {

  @Input() festival!: Festival
  @Output() updateEditeurEmitter = new EventEmitter<any>();

  form_group!: FormGroup
  currentJeux!: Jeux

  jeuxTypes: string[] = ["enfant", "famille", "initié", "expert", "role"];

  @Input() currentEditeurs!: Editeur[]
  currentEditeurId: string = ""


  constructor(private editeurService: EditeursService,
              private fb: FormBuilder) {}


  ngOnInit() {
    this.resetJeux();
    this.initForms();
  }


  resetJeux(){
    this.currentJeux = new Jeux("");
  }

  initForms(){
    this.form_group = this.fb.group({
      name: [this.currentJeux.name, [
        Validators.required,
        Validators.minLength(4),
        UsernameValidator.cannotContainSpace,
        UsernameValidator.cannotStartOrEndWithSpace
      ]],
      nb_joueurs_min: [this.currentJeux.nb_joueurs_min, [Validators.required]],
      nb_joueurs_max: [this.currentJeux.nb_joueurs_max, [Validators.required]],
      age_min: [this.currentJeux.age_min, [Validators.required]],
      age_max: [this.currentJeux.age_max, [Validators.required]],
      duration: [this.currentJeux.duration, [Validators.required]],
      type: [this.currentJeux.type, [Validators.required]],
      editeurId: [this.currentEditeurId, [Validators.required]]
    });
  }

  onCreate(){
    const name = this.form_group.get("name")?.value;
    const nb_joueurs_min = this.form_group.get("nb_joueurs_min")?.value;
    const nb_joueurs_max = this.form_group.get("nb_joueurs_min")?.value;
    const age_min = this.form_group.get("age_min")?.value;
    const age_max = this.form_group.get("age_max")?.value;
    const duration = this.form_group.get("duration")?.value;
    const type = this.form_group.get("type")?.value;
    const editeurId = this.form_group.get("editeurId")?.value;
    const editeur = this.currentEditeurs.find(editeur => editeur.id === editeurId);
    if(!editeur) return;
    const jeu: Jeux = new Jeux(name, undefined, type, age_min, age_max, nb_joueurs_min, nb_joueurs_max, duration);
    this.updateEditeurEmitter.emit({editeur: editeur, jeu: jeu});
  }

}
