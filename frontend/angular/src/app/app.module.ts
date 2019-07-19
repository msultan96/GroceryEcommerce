import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { IndexComponent } from './index/index.component';
import { SignupformComponent } from "./signupform/signupform.component";
import { LoginComponent } from "./login/login.component";
import { AdminProductComponent } from './admin-product/admin-product.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogoutComponent } from './logout/logout.component';
import {AppService} from "./app.service";
import {BasicAuthHttpInterceptorService} from "./service/basic-auth-http-interceptor.service";
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignupformComponent,
    AdminProductComponent,
    NavigationComponent,
    LogoutComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService,
    {
      provide: HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
