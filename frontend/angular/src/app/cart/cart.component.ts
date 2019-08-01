import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../model/product-model";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private httpClient:HttpClient,
    private productService:ProductService,
    private router:Router
  ) { }

  cart = new Map<ProductModel, number>();


  ngOnInit() {
    if(this.auth.isUserLoggedIn()) this.populateCart();
    else this.auth.redirectHome();
  }

  populateCart(){
    this.auth.getCart().subscribe(
      response => {
        let map = new Map<string, number>();
        let cart = response.body["cart"];
        Object.keys(cart).forEach((key) =>
          map.set(key, cart[key])
        );
        map.forEach((v,k) => {
          this.productService.getProduct(k).subscribe(
            response => {
              let product:ProductModel;
              product = JSON.parse(JSON.stringify(response.body));
              this.cart.set(product,v);
              console.log(Array.from(this.cart.entries()))
            }
          );
        });
      }
    )
  }

  public cartEntries(){ return Array.from(this.cart.entries()) }

  private removeFromCart(product){
    const username = this.auth.getUsername();
    const productUpc = product["upc"];
    this.httpClient.post(this.auth.backend+"/user/removeFromCart",{username, productUpc} , {observe: 'response'}).subscribe(
      response => {
        console.log(response.body);
      },
      error =>{
        this.auth.error(error);
      }
    )
  }
}
