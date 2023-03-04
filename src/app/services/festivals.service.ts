import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Festival} from "../models/festival";
import {FestivaljsonService} from "./festivaljson.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {

  constructor(private festivaljsonService: FestivaljsonService) { }

  public getFestival(id: any): Observable<Festival | undefined> {
    return this.festivaljsonService.getFestivals().pipe(
      map(data => data.find(festival => festival.id === id))
    )
  }
}
