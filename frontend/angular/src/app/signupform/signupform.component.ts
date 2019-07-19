import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegisterModel} from "../model/register-model";
import {AuthService} from "../service/auth.service";
import {HttpclientService} from "../service/httpclient.service";
import {ProductModel} from "../model/product-model";

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})

export class SignupformComponent implements OnInit {

  registerModel:RegisterModel = {
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
    firstName:'',
    lastName:'',
    cart: new Map<string, number>()
  };

  public emailTaken:boolean;
  public usernameTaken:boolean;


  constructor(
    public router: Router,
    public auth: AuthService,
    public httpService: HttpclientService
  ) {
  }

  ngOnInit() {
    if(this.auth.isUserLoggedIn())
      this.router.navigate(['index']);
  }

  submitSignUpForm() {
    this.emailTaken=false;
    this.usernameTaken=false;
    let user = this.registerModel;
    if(!user.email || !user.username || !user.password || !user.confirmPassword || !user.firstName || !user.lastName) return;
    console.log("USER: " + user);
    console.log("CART: " + user.cart);
    this.auth.createUser(user).subscribe(
      response => {
        const registrationResponse = response.body["registrationResponse"];
        const emailTaken = response.body["emailTaken"];
        const usernameTaken = response.body["usernameTaken"];
        if(emailTaken){
          this.emailTaken=true;
        }
        if(usernameTaken){
          this.usernameTaken=true;
        }
        if(registrationResponse){
          this.router.navigate(
            ['login'],
            {state:{
                message:{
                  msg:"You have been successfully registered",
                  class:"alert alert-success"
                }}});
          this.registerModel=null;
        }
      },
      error => {
        this.auth.error(error);
      }
    );
  }

}
