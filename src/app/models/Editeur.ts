import { Optional } from "@angular/core";
import {Jeux} from "./Jeux";

export class Editeur {

  public id?: string
  public name: string
  public contact?: string
  public jeux!: Jeux[]

  constructor(name: string,
              @Optional() id?: string,
              @Optional() contact?: string,
              @Optional() jeux?: Jeux[]) {
    this.name = name;
    if(contact) this.contact = contact;
    if(id) this.id = id;
    if(jeux) this.jeux = jeux;
  }

}
