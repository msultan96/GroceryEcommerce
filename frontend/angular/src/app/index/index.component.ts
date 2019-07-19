import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products = [];
  private backend = "http://localhost:8080";

  constructor(
    private httpClient:HttpClient,
    private router:Router,
    private auth:AuthService
  ) {}

  ngOnInit() {
    if(this.auth.isUserLoggedIn()) this.populateProducts();
    else this.auth.redirectHome();
  }

  private populateProducts() {
    this.httpClient.get(this.backend+"/product/findAll", {observe: 'response'}).subscribe(
      response =>  {
        for(let product in response.body){
          this.products[product]=response.body[product];
        }
      },
      error => {
        this.auth.error(error);
      }
    )
  }

  private addToCart(product){
    const username = this.auth.getUsername();
    const productUpc = product["upc"];
    console.log(product["upc"]);
    this.httpClient.post(this.backend+"/user/addToCart",{username, productUpc} , {observe: 'response'}).subscribe(
      response => {
        console.log(response.body);
      },
      error =>{
        this.auth.error(error);
      }
    )
  }

}
