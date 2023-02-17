import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../enviroments/enviroment";
import {Plane} from "../model/plane";

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getPlanes(): Observable<Plane[]> {
    return this.http.get<Plane[]>(`${this.apiServerUrl}/plane/all`);
  }

  public addPlane(plane: Plane): Observable<Plane> {
    return this.http.post<Plane>(`${this.apiServerUrl}/plane/add`, plane);
  }

  public updatePlane(plane: Plane): Observable<Plane> {
    return this.http.put<Plane>(`${this.apiServerUrl}/plane/update`, plane);
  }

  public deletePlane(planeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/plane/delete/${planeId}`);
  }

  public getNumberOfSeats(planeId: string, seatClassCode: string): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/seats/get-number-of-seats/${planeId}/${seatClassCode}`);
  }
}
