import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../model/reservation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public outboundReservations: Reservation[] = [];
  public returnReservations: Reservation[] = [];
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getReservationsByFlightAndClass(flightId: string, seatClassCode: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/find-by-flight-and-class/${flightId}/${seatClassCode}`);
  }
}
