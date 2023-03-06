import { Injectable } from '@angular/core';
import {find, Observable} from "rxjs";
import {Festival} from "../models/festival";
import {map, tap} from "rxjs/operators";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Editeur} from "../models/Editeur";
import {Jeux} from "../models/Jeux";


@Injectable({
  providedIn: 'root'
})
export class EditeursService {

  private path = '/editeurs/';
  private editeurStore: AngularFirestore;
  private editeurCollection: AngularFirestoreCollection<Editeur>;
  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private messageService: MessageService)
  {
    this.editeurStore = db;
    this.editeurCollection = db.collection(this.path);
  }

  private json2Jeux(json: any): Jeux {
    return new Jeux(
      json.name,
      json.id,
      json.type,
      json.age_min,
      json.age_max,
      json.nb_joueurs_min,
      json.nb_joueurs_max,
      json.duration)
  }

  private json2Editeur(json: any): Editeur {
    return new Editeur(
      json.name,
      json.id,
      json.contact
    );
  }

  public getJeux(editeur: Editeur): Observable<Jeux[]> | null {
    if(!editeur.id) return null
    const jeuxCollection = this.db.collection(this.path+editeur.id+"/jeux/");

    return jeuxCollection.valueChanges({ idField: "id" }).pipe(
      tap(doc => {this.messageService.log(`doc=${JSON.stringify(doc)}`)}),
      map(data => data.map(doc => this.json2Jeux(doc)))
    )
  }

  public deleteJeu(editeur: Editeur, jeu: Jeux){
    this.editeurStore.doc<Jeux>(this.path+editeur.id+"/jeux/"+jeu.id).delete();
  }

  public addUpdateJeu(editeur: Editeur, jeu: Jeux) {
    const jeuxCollection = this.db.collection(this.path+editeur.id+"/jeux/");

    if (jeu.id == null) {
      jeu.id = this.editeurStore.createId()
    }
    jeuxCollection.doc(jeu.id).set( Object .assign({}, jeu));
  }

  public addJeu(editeur: Editeur, jeu: Jeux){
    const jeuxCollection = this.db.collection(this.path+editeur.id+"/jeux/");

    if (jeu.id == null) {
      jeu.id = this.editeurStore.createId()
    }
    jeuxCollection.doc(jeu.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          jeuxCollection.doc(jeu.id).set(Object.assign({},
            jeu));
        }
      });
  }

  public getEditeurs(festival: Festival): Observable<Editeur[]> {
    return this.editeurCollection
      .valueChanges({ idField: 'id' }).pipe(
        tap(doc=>{this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => {
          return data.map(doc => this.json2Editeur(doc))
            .filter(editeur => {
              if (editeur.id && festival.editeurs.includes(editeur.id)) {
                return editeur;
              }
              else return undefined;
            })
        })
      )
  }

  public addUpdateEditeur(editeur: Editeur) {
    if (editeur.id == null) {
      editeur.id = this.editeurStore.createId()
    }
    this.editeurCollection.doc(editeur.id).set( Object .assign({}, editeur));
  }

  public addNewEditeur(editeur: Editeur) {
    if (editeur.id == null) {
      editeur.id = this.editeurStore.createId()
    }
    this.editeurCollection.doc(editeur.id).get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.editeurCollection.doc(editeur.id).set(Object.assign({},
            editeur));
        } // else doc exists!
      });
  }

  public getAllEditeurs(): Observable<Editeur[]> {
    return this.editeurCollection
      .valueChanges({ idField: "id" }).pipe(
        tap(doc=>{this.messageService.log(`doc=${JSON.stringify(doc)}`) }),
        map(data => data.map(doc => this.json2Editeur(doc)))
      );
  }

  public deleteEditeur(editeur: Editeur) {
    this.editeurStore.doc<Editeur>(this.path+editeur.id).delete();
  }


}
