import {Component, OnInit} from '@angular/core';
import {Festival} from "../../../models/festival";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsernameValidator} from "../../../validators/name.validator";
import {FestivaljsonService} from "../../../services/festivaljson.service";

@Component({
  selector: 'app-festival-create',
  templateUrl: './festival-create.component.html',
  styleUrls: ['./festival-create.component.css']
})
export class FestivalCreateComponent implements OnInit{

  festival_name: string = ""
  form_group!: FormGroup

  constructor(
    private festivaljsonService: FestivaljsonService,
    private fb : FormBuilder) {}


  ngOnInit() {
    this.initForms();
  }

  initForms(){
    this.form_group = this.fb.group({
      name: [this.festival_name, [
        Validators.required,
        Validators.minLength(4),
        UsernameValidator.cannotContainSpace,
        UsernameValidator.cannotStartOrEndWithSpace
      ]]
    });
  }

  onCreate(){
    const festivalname = this.form_group.get("name")?.value;
    const festival: Festival = new Festival(festivalname)
    this.festivaljsonService.addNewFestival(festival);
  }

}
