import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token! :string
  private _isLoggedIn:boolean = false
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  isLoggedInn(){
    return false
  }

  constructor(private http: HttpClient,
              private router: Router) {

  }

  authenticate(username: string, password: string): Observable<any>{
    //let headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    let body = {
      email: username,
      password: password
    };
    return this.http.post<any>('http://localhost:8080/auth/authenticate', {
      email: username,
      password: password
    })
    /*fetch('http://localhost:8080/auth/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email : username,
        password : password
      })
    }).then(res => res.text())
      .then(data => {
        this.token = data
        this.isLoggedIn = true;
        console.log(this.token)
        console.log(`in authenticate ${this._isLoggedIn}`)
      })
      .catch(error => {
        console.log('Error:', error);
        this.isLoggedIn = false
        console.log(`in authenticate ${this._isLoggedIn}`)
      });
    console.log(`in authenticate 2 ${this._isLoggedIn}`)
    return this._isLoggedIn*/
  }

  register(username: string, password: string, firstname: string, lastname: string){
    return this.http.post<any>('http://localhost:8080/user/add', {
      firstName: firstname,
      lastName: lastname,
      username: username,
      password: password,
      email: "email@gmail.com"
    })
  }
}
