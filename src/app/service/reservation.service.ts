import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./authentication/auth.service";
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getReservations(): Observable<Reservation[]> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/all`, {headers : header});
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.post<Reservation>(`${this.apiServerUrl}/reservation/add`, reservation, {headers : header});
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.put<Reservation>(`${this.apiServerUrl}/reservation/update`, reservation, {headers : header});
  }

  public deleteReservation(reservationId: string): Observable<void> {
    let header = { 'Authorization': `Bearer ${this.authService.token}`};
    return this.http.delete<void>(`${this.apiServerUrl}/reservation/delete/${reservationId}`, {headers : header});
  }
}
