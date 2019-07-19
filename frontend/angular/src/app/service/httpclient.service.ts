import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterModel} from "../model/register-model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class HttpclientService {
  
  constructor(
    private httpClient:HttpClient,
    private auth:AuthService
  ) {}

}
