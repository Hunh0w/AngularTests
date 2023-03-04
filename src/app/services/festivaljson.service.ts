import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Festival} from "../models/festival";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class FestivaljsonService {

  private path = '/festivals/';
  private festivalStore: AngularFirestore;
  private festivalCollection: AngularFirestoreCollection<Festival>;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private messageService: MessageService)
  {
    this.festivalStore = db;
    this.festivalCollection = db.collection(this.path);
  }

  json2Festival(json: any): Festival {
    return new Festival(
      json.name, json.id, json.editeurs, json.tablemax_1, json.tablemax_2,
      json.tablemax_3, json.tableprice_1, json.tableprice_2, json.tableprice_3,
      json.sqmprice_1, json.sqmprice_2, json.sqmprice_3);
  }

  public getFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>('/assets/festivals.json').pipe(
      map(data => data.map(json => this.json2Festival(json) ))
    )
  }

  public getAllFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc=>{this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.json2Festival(doc)))
      );
  }

  addUpdateFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).set( Object .assign({}, festival));
  }
  addNewFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection.doc(festival.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.festivalCollection.doc(festival.id).set(Object.assign({},
            festival));
        } // else doc exists!
      });
  }

  deleteFestival(festival: Festival) {
    this.festivalStore.doc<Festival>(this.path+festival.id).delete();
  }
  getFestival(id: String): Observable<Festival> {
    var itemDoc = this.festivalStore.doc<Festival>(this.path+ id);
    return itemDoc.valueChanges()
      .pipe(
        map( fest => this.json2Festival(fest) )
      );
  }
}
