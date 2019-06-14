import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class User{
  constructor(public id:string, public userName:string, public password:string, public email:string, public firstName:string, public lastName:string) {}
}
export class RegistrationResponse{
  constructor(public registrationResponse:boolean, public emailTaken:boolean, public userNameTaken:boolean){}
}
@Injectable({
  providedIn: 'root'
})

export class HttpclientService {
  
  constructor(private httpClient:HttpClient) {}
}
