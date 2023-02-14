import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../model/airport";
import {AuthService} from "./authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getAirports(): Observable<Airport[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Airport[]>(`${this.apiServerUrl}/airport/all`, {headers: header});
  }

  public getAirportByCode(airportCode: string): Observable<Airport> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Airport>(`${this.apiServerUrl}/airport/find/${airportCode}`, {headers: header});
  }
}
