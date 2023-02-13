import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airport} from "../model/airport";

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  public getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.apiServerUrl}/airport/all`);
  }

  public getAirportByCode(airportCode: string): Observable<Airport> {
    return this.http.get<Airport>(`${this.apiServerUrl}/airport/find/${airportCode}`);
  }
}
