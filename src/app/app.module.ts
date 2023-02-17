import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PlaneService} from "./service/plane.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanesComponent } from './planes/planes.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import { FlightComponent } from './flight/flight.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { PassengersComponent } from './passengers/passengers.component';
import { SeatComponent } from './seat/seat.component';
import {MatTabsModule} from "@angular/material/tabs";

const appRoutes: Routes = [
  {path : '', component : SearchComponent},
  {path : 'searchflight/:dep-airport/:arr-airport/:dep-date/:class/:nb-of-passengers-adults/:nb-of-passengers-children', component : FlightComponent},
  {path : 'searchflight/:dep-airport/:arr-airport/:dep-date/:class/:nb-of-passengers-adults/:nb-of-passengers-children/:re-date', component : FlightComponent},
  {path : 'plane', component : PlanesComponent},
  {path : 'passengers/:outbound-flight-id/:return-flight-id/:nb-of-passengers-adults/:nb-of-passengers-children/:class', component : PassengersComponent},
  {path : 'passengers/:outbound-flight-id/:nb-of-passengers-adults/:nb-of-passengers-children/:class', component : PassengersComponent},
  {path : 'seat', component : SeatComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PlanesComponent,
    NavbarComponent,
    FlightComponent,
    PassengersComponent,
    SeatComponent
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
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule
    ],
  providers: [
    PlaneService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
