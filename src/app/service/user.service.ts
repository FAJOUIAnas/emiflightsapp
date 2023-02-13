import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plane} from "../model/plane";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }


  public getUserByCredentials(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/findByCre/${username}/${password}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}

interface Credentials {
  usernam: string
  passwor: string
}
