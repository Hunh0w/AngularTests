import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Festival } from 'src/app/models/festival';
import { UsernameValidator } from 'src/app/validators/name.validator';
import {ActivatedRoute} from "@angular/router";
import {FestivaljsonService} from "../../../services/festivaljson.service";
import {Editeur} from "../../../models/Editeur";
import {Jeux} from "../../../models/Jeux";

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent implements OnInit, OnChanges {

  @Input() festival!: Festival
  @Input() currentEditeurs!: Editeur[]
  @Output() deleteFestival = new EventEmitter<Festival>();
  @Output() unSelectEmitter = new EventEmitter<Editeur>();
  @Output() updateEditeurEmitter = new EventEmitter<any>();
  @Output() deleteJeuEmitter = new EventEmitter<any>();

  festivalGroup!: FormGroup
  selectedEditeur!: string

  constructor(
    public fb : FormBuilder,
    private festivalService : FestivaljsonService,
    private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes["festival"]) return;
    const newFestival = changes["festival"]["currentValue"];
    this.initFormGroup(newFestival);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('festivalId')) {
      const id = this.route.snapshot.paramMap.get('festivalId');
      this.festivalService.getFestival(`${id}`).subscribe(
        (fest) => {
          if(fest == undefined) return;
          this.festival = fest;
          this.initFormGroup(this.festival)
        }
      );
      return;
    }

    this.initFormGroup(this.festival)
  }

  initFormGroup(festival: Festival){
    this.festivalGroup = this.fb.group({
      name: [festival.name, [
        Validators.required,
        Validators.minLength(4),
        UsernameValidator.cannotContainSpace,
        UsernameValidator.cannotStartOrEndWithSpace
      ]],
      entrancePrice: [festival.tableprice_1, [Validators.required, Validators.min(80)]],
      roomPrice: [festival.tableprice_2, [Validators.required, Validators.min(70)]]
    });

    this.festivalGroup.get("name")?.valueChanges.subscribe((value) => {
      festival.name = value;
    })
    this.festivalGroup.get("entrancePrice")?.valueChanges.subscribe((value) => {
      festival.tableprice_1 = value;
    })

    this.festivalGroup.get("roomPrice")?.valueChanges.subscribe((value) => {
      festival.tableprice_2 = value;
    })

  }

  onUpdate(){
    this.festivalService.addUpdateFestival(this.festival);
  }

  onDelete(){
    this.deleteFestival.emit(this.festival);
  }

  unSelectEditeur(editeur: Editeur){
    this.unSelectEmitter.emit(editeur);
  }

  onUpdateEditeur(editeur: Editeur){
    this.updateEditeurEmitter.emit(editeur);
  }

  onDeleteJeux(obj: any){
    this.deleteJeuEmitter.emit(obj);
  }

}
