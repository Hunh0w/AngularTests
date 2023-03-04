import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsernameValidator} from "../../../validators/name.validator";
import {Editeur} from "../../../models/Editeur";
import {EditeursService} from "../../../services/editeurs.service";

@Component({
  selector: 'app-editeurs-create',
  templateUrl: './editeurs-create.component.html',
  styleUrls: ['./editeurs-create.component.css']
})
export class EditeursCreateComponent implements OnInit{

  @Output() createEditeurEmitter = new EventEmitter<Editeur>();

  form_group!: FormGroup
  currentEditeur!: Editeur


  constructor(private fb : FormBuilder,
              private editeurService: EditeursService) {}



  ngOnInit() {
    this.resetCurrentEditeur();
    this.initForm();
  }

  onCreate(){
    this.editeurService.addNewEditeur(this.currentEditeur);
    this.createEditeurEmitter.emit(this.currentEditeur);
    this.resetCurrentEditeur();
  }

  resetCurrentEditeur(){
    this.currentEditeur = new Editeur("", undefined, "")
  }

  initForm(){
    this.form_group = this.fb.group({
      name: [this.currentEditeur.name, [
        Validators.required,
        Validators.minLength(4),
        UsernameValidator.cannotContainSpace,
        UsernameValidator.cannotStartOrEndWithSpace
      ]],
      contact: [this.currentEditeur.contact, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]]
    });
  }

}
