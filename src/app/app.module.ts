import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RootComponent } from './components/root/root.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FestivalCreateComponent } from './components/festival/festival-create/festival-create.component';
import { EditeursListComponent } from './components/editeurs/editeurs-list/editeurs-list.component';
import { EditeursSelectComponent } from './components/editeurs/editeurs-select/editeurs-select.component';
import { EditeursCreateComponent } from './components/editeurs/editeurs-create/editeurs-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent,
    FestivalCreateComponent,
    EditeursListComponent,
    EditeursSelectComponent,
    EditeursCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'festivals', component: FestivalsListComponent},
      {path: 'festival/:festivalId', component: FestivalDetailsComponent},
      {path: 'App', component: AppComponent},
      {path: '', redirectTo: '/App', pathMatch: 'full'},
      {path: 'editeurs', component: EditeursListComponent}
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {}
