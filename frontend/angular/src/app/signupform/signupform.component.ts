import { Component, OnInit } from '@angular/core';
import {RegistrationResponse, User} from "../service/httpclient.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterModel} from "../register-model";

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})

export class SignupformComponent implements OnInit {

  registerModel:RegisterModel = {
    userName:'',
    password:'',
    confirmPassword:'',
    email:'',
    firstName:'',
    lastName:''
  };
  public emailTaken:boolean;
  public userNameTaken:boolean;


  constructor(private httpClient:HttpClient, public router: Router) {
  }

  ngOnInit() {
  }

  submitSignUpForm() {
    this.emailTaken=false;
    this.userNameTaken=false;
    let backend = "http://localhost:8080/users/";
    let user = this.registerModel;
    if(!user.email || !user.userName || !user.password || !user.confirmPassword || !user.firstName || !user.lastName) return;
    this.httpClient.put(backend, this.registerModel, {observe: 'response'}).subscribe(
      response => {
        var registrationResponse = response.body["registrationResponse"];
        var emailTaken = response.body["emailTaken"];
        var userNameTaken = response.body["userNameTaken"];
        if(emailTaken){
          this.emailTaken=true;
        }
        if(userNameTaken){
          this.userNameTaken=true;
        }
        if(registrationResponse){
          this.router.navigate(['login'],{state:{newRegister: true}});
          this.registerModel=null;
        }
      },
      error => {
        alert("There seems to be an issue. Please try again.");
        if (error.error instanceof ErrorEvent) {
          console.error(`An error occurred: ${error.error.message}`);
        } else {
          console.error(`Backend returned error code: ${error.status} ` +
            `body was: ${error.body}`);
        }
        return;
      }
    );
  }

}
