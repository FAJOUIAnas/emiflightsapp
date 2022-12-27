import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PlaneService} from "./service/plane.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanesComponent } from './planes/planes.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import { FlightComponent } from './flight/flight.component';

const appRoutes: Routes = [
  {path : '', component : SearchComponent},
  {path : 'searchflight/:dep-airport/:arr-airport/:dep-date', component : FlightComponent},
  {path : 'plane', component : PlanesComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PlanesComponent,
    NavbarComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCardModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [PlaneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
