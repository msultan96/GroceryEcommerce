import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../model/login-model";
import {UserModel} from "../model/user-model";
import {AuthService} from "../service/auth.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	usernameInvalid:boolean;
	passwordInvalid:boolean;

	loginModel: LoginModel = {
		username: '',
		password: '',
	};

	message = {
	  message:"",
    class:"",
  };

	constructor(
	  private httpClient: HttpClient,
    private router: Router,
    private auth:AuthService
  ) {
		const navigation = this.router.getCurrentNavigation();
		const state = navigation.extras.state as {
			message : {
			  msg:string,
        class:string
    }
		};
		if(state) {
			if(state.message){
			  this.message.message=state.message.msg;
			  this.message.class=state.message.class;
      }
		}
	}

	ngOnInit() {
	  if(this.auth.isUserLoggedIn()){
	    this.router.navigate(['index']);
    }
	}

	submitLogin() {
		let loginUser = this.loginModel;
		if(!loginUser.username || !loginUser.password) return;
    this.auth.authenticate(this.loginModel).subscribe(
      response => {
        let userLoginResponse = response.body["userLoginResponse"];
        let usernameExists = response.body["usernameExists"];
        let passwordValid = response.body["passwordValid"];
        let username = response.body["username"];
        let email = response.body["email"];
        let firstName = response.body["firstName"];
        let lastName = response.body["lastName"];
        let cart = response.body["cart"];
        if(usernameExists && !passwordValid){
          this.message.message="The password you entered was incorrect";
          this.message.class="alert alert-danger";
          return;
        }
        if(!usernameExists){
          this.message.message="The username you entered does not exist";
          this.message.class="alert alert-danger";
          return;
        }
        if(userLoginResponse){
          this.usernameInvalid=false;
          this.passwordInvalid=false;
          sessionStorage.setItem("username",username);
          sessionStorage.setItem("email",email);
          sessionStorage.setItem("firstName",firstName);
          sessionStorage.setItem("lastName",lastName);
          sessionStorage.setItem("cart",JSON.stringify(cart));
          this.router.navigate(['index']);
        }
      },
      error => {
        this.auth.error(error);
      }
    );
	}

}
