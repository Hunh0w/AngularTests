import {Optional} from "@angular/core";

type TypeJeux = "enfant" | "famille" | "initié" | "expert" | "role";

export class Jeux {

  public id?: string
  public name: string;
  public type: TypeJeux;
  public age_min: number;
  public age_max: number;
  public nb_joueurs_min: number;
  public nb_joueurs_max: number;
  public duration: string;


  constructor(name: string,
              @Optional() id?: string,
              @Optional() type?: TypeJeux,
              @Optional() age_min?: number,
              @Optional() age_max?: number,
              @Optional() nb_joueurs_min?: number,
              @Optional() nb_joueurs_max?: number,
              @Optional() duration?: string) {
    this.name = name;
    this.type = type ? type : "initié";
    this.age_min = age_min ? age_min : 18;
    this.age_max = age_max ? age_max : 100;
    this.nb_joueurs_min = nb_joueurs_min ? nb_joueurs_min : 2;
    this.nb_joueurs_max = nb_joueurs_max ? nb_joueurs_max : 20;
    this.duration = duration ? duration : "15 minutes";
    if(id) this.id = id;
  }

}
