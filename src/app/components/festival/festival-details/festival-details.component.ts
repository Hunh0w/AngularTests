import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Festival } from 'src/app/models/festival';
import { UsernameValidator } from 'src/app/validators/name.validator';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.css']
})
export class FestivalDetailsComponent implements OnInit, OnChanges {

  @Input() festival!: Festival
  festivalGroup!: FormGroup

  constructor(public fb : FormBuilder){}

  ngOnChanges(changes: SimpleChanges): void {
    const newFestival = changes["festival"]["currentValue"];
    this.initFormGroup(newFestival);
  }

  ngOnInit(): void {
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

    /*
    this.festivalGroup = new FormGroup({
      name: new FormControl(this.festival.name),
      entrancePrice: new FormControl(this.festival.tableprice_1)
    });
    */

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

  onSubmit(){
    this.festival.name = this.festivalGroup.get("name")?.value;
    this.festival.tableprice_1 = this.festivalGroup.get("entrancePrice")?.value;
    this.festival.tableprice_2 = this.festivalGroup.get("roomPrice")?.value;
  }

}
