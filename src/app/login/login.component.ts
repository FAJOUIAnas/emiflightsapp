import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/authentication/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/user";
import {AuthGuard} from "../service/authentication/auth.guard";
import { ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string
  password!: string
  image!: string
  isSignUpForm: boolean = false
  user: User = new User("", "","", "", "", "", "", "",
    "", "")
  url!: string

  ngOnInit(){
    console.log(this.authService.appUsers)
  }

  constructor(private authService: AuthService, private router: Router,private guard: AuthGuard,
              private route: ActivatedRoute) {}

  onSubmit(f: NgForm){
    this.user.username = f.value["username"]
    this.user.password = f.value['password']
    this.username = this.user.username
    this.password = this.user.password
    this.authService.username = this.username
    this.authService.password = this.password
    console.log(`${this.username}  ${this.password}`)
    this.login(this.username, this.password)
  }

  onSubmit2(form: NgForm) {
    console.log(`${form.value["usernameR"]}  ${form.value["passwordR"]}   ${form.value["firstname"]}
    ${form.value["lastname"]}`)
    this.user.username = form.value["usernameR"]
    this.user.password = form.value["passwordR"]
    this.user.firstName = form.value["firstname"]
    this.user.lastName = form.value["lastname"]
    this.authService.username = this.user.username
    this.authService.password = this.user.password
    this.register(form.value["usernameR"], form.value["passwordR"], form.value["firstname"],
      form.value["lastname"])
  }

  /*this.authService
    .login(this.form.get('username').value, this.form.get('password')?.value)
    .subscribe((response) => {
      this.router.navigate(['/page']);
    });*/


  private login(username: string, password: string) {
    let found
    let userFound
    /*let userIndex
    let found
    for (let user of this.authService.appUsers){
        console.log(user)
        userIndex = this.authService.appUsers.indexOf(user)
        if (user.username === username) {
          found = true
          break;
        }
    }
    console.log(userIndex)
    console.log(this.authService.tokens)
    // @ts-ignore
    if(this.authService.tokens.length >= userIndex + 1){
      // @ts-ignore
      this.authService.token = this.authService.tokens.at(userIndex + 1)
      this.authService.isLoggedIn = true
      this.router.navigate([""])
    }*/

    // @ts-ignore
    for (let user of this.authService.appUsers.keys()){
      if (user.username === username){
        found = true
        userFound = user
        break;
      }
    }
    if (found){
      // @ts-ignore
      this.authService.token = this.authService.appUsers.get(userFound)
      console.log(this.authService.token)
      this.authService.isLoggedIn = true
      this.router.navigate(["profil"])
    }

    if (!this.authService.isLoggedIn){
      this.authService.authenticate(username, password).subscribe(
        (data: any) => {
          if (!!data) {
            this.authService.token = data.token
            this.authService.tokens = data.tokens
            this.authService.appUsers.set(data.userDetails, this.authService.token)
            this.authService.isLoggedIn = true
            console.log(this.authService.token)
            console.log(this.authService.isLoggedIn)
            this.router.navigate(["profil"])
          }
          else{
            this.authService.isLoggedIn = false
            alert("Wrong credentials")
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
    }
  }

  register(username: string, password: string, firstname: string, lastname: string) {
    this.authService.register(username, password, firstname, lastname).subscribe(
      (data: User) => {
        console.log(data)
        this.login(data.username, data.password)
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
}