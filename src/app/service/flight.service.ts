import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../model/flight";
import {AuthService} from "./authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public searchFlight(depAirport: string, arrAirport: string, depDate: string, _class: string, nbOfPassengers: number): Observable<Flight[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<Flight[]>(`${this.apiServerUrl}/flight/search?depAirport=${depAirport}&arrAirport=${arrAirport}&depDate=${depDate}&classCode=${_class}&numberOfPassengers=${nbOfPassengers}`, {headers: header});
  }

  public getFlightById(flightId: string): Observable<Flight> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`}
    return this.http.get<Flight>(`${this.apiServerUrl}/flight/find/${flightId}`, {headers: header});
  }
}
