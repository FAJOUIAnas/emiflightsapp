import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username!: string
  password!: string
  urlToRedirect! : string
  token! :string
  tokens :string[] = []
  appUsers = new Map<User, string>();
  private _isLoggedIn:boolean = false
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
    /*this.appUsers.push(new User("", "Saif Elislam", "Bettaoui", "",
      "", "", "", "password", "saif"))
    this.appUsers.push(new User("", "anas", "Fejoui", "",
      "", "", "", "password_2", "anas"))
    this.appUsers.push(new User("", "Youness", "Ifrah", "",
      "", "", "", "password_3", "youness"))
    this.appUsers.push(new User("", "Houssam Eddine", "Jazouli", "",
      "", "", "", "password_4", "houssam"))*/
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
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

  logout(){
    this.token = ""
    this.isLoggedIn = false
    console.log(this.token)
    console.log("Logged out")
    this.router.navigate(["login"])
  }

  redirectToLogin(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.urlToRedirect = event.url;
        console.log(this.urlToRedirect)
      });
      this.router.navigate(["login"])
  }
}
