import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/authentication/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../model/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string
  password!: string
  url!: string

  ngOnInit(){

  }

  constructor(private authService: AuthService, private router: Router,
              private route: ActivatedRoute) {}

  onSubmit(f: NgForm){
    this.username = f.value["username"]
    this.password = f.value['password']
    console.log(`${this.username}  ${this.password}`)
    this.login(this.username, this.password)
  }

  onSubmit2(form: NgForm) {
    console.log(`${form.value["usernameR"]}  ${form.value["passwordR"]}   ${form.value["firstname"]}
    ${form.value["lastname"]}`)
    this.register(form.value["usernameR"], form.value["passwordR"], form.value["firstname"],
      form.value["lastname"])
  }

  /*this.authService
    .login(this.form.get('username').value, this.form.get('password')?.value)
    .subscribe((response) => {
      this.router.navigate(['/page']);
    });*/


  private login(username: string, password: string) {
    this.authService.authenticate(username, password).subscribe(
      (data: any) => {
        if (!!data) {
          this.authService.token = data.token
          this.authService.isLoggedIn = true
          console.log(this.authService.token)
          console.log(this.authService.isLoggedIn)

          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          // @ts-ignore
          this.url = returnUrl
          console.log(returnUrl)
          this.url.replace('/','')
          console.log(this.url)
          this.router.navigate([""])
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
