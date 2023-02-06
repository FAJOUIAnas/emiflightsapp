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
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./service/authentication/auth.guard";
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  {path : '', component : SearchComponent},
  {path : 'searchflight/:dep-airport/:arr-airport/:dep-date', component : FlightComponent},
  {path : 'plane', component : PlanesComponent, canActivate : [AuthGuard]},
  {path: 'login', component: LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PlanesComponent,
    NavbarComponent,
    FlightComponent,
    LoginComponent,
    RegisterComponent
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
    MatNativeDateModule
  ],
  providers: [
    PlaneService,
    MatDatepickerModule,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
