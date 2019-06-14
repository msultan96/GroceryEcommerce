import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../login-model";
import {UserModel} from "../user-model";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public newRegister: boolean;
	public usernameInvalid:boolean;
	public passwordInvalid:boolean;

	loginModel: LoginModel = {
		userName: '',
		password: '',
	};

	userModel: UserModel ={
		userName:'',
		email:'',
		firstName:'',
		lastName:''
	};

	constructor(private httpClient: HttpClient, private router: Router) {
		const navigation = this.router.getCurrentNavigation();
		const state = navigation.extras.state as {
			newRegister: boolean
		};
		if(state) {
			console.log(state.newRegister);
			this.newRegister = true;
		}
	}

	ngOnInit() {
	}

	submitLogin() {
		let backend = "http://localhost:8080/users/login/";
		let loginUser = this.loginModel;
		let successUser = this.userModel;
		if(!loginUser.userName || !loginUser.password) return;
		this.httpClient.post(backend, this.loginModel, {observe: 'response'}).subscribe(
			response => {

				let userLoginResponse = response.body["userLoginResponse"];
				let usernameExists = response.body["usernameExists"];
				let passwordValid = response.body["passwordValid"];
				let username = response.body["username"];
				let email = response.body["email"];
				let firstName = response.body["firstName"];
				let lastName = response.body["lastName"];

				if(usernameExists && !passwordValid){
					this.usernameInvalid=false;
					this.passwordInvalid=true;
				}
				if(!usernameExists){
					this.usernameInvalid=true;
					this.passwordInvalid=false;
				}
				if(userLoginResponse){
					this.usernameInvalid=false;
					this.passwordInvalid=false;
					successUser.userName=username;
					successUser.email=email;
					successUser.firstName=firstName;
					successUser.lastName=lastName;
          this.router.navigate(['index'],{state:{successUser}});
          loginUser=null;
          successUser=null;

				}
			},
			error => {
				alert("There seems to be an issue. Please try again.");
				if (error.error instanceof ErrorEvent) {
				} else {
					console.error(`An error occurred: ${error.error.message}`);
					console.error(`Backend returned error code: ${error.status} ` +
						`body was: ${error.body}`);
				}
				return;
			}
		);
	}

}
