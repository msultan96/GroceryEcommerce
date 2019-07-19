import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupformComponent} from "./signupform/signupform.component";
import {IndexComponent} from "./index/index.component";
import {AdminProductComponent} from "./admin-product/admin-product.component";
import {LogoutComponent} from "./logout/logout.component";
import {CartComponent} from "./cart/cart.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:"full"
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animation: 'isLeft',
    }
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path: 'signup',
    component: SignupformComponent,
    data: {
      animation: 'isRight'
    }
  },
  {
    path:'index',
    component:IndexComponent,
    data: {
      animation: 'isRight'
    }
  },
  {
    path:'admin-product',
    component:AdminProductComponent,
    data: {
      animation: 'isRight'
    }
  },
  {
    path:'cart',
    component:CartComponent,
    data: {
      animation: 'isRight'
    }
  },
  {
    path:'product',
    component:ProductComponent,
    data: {
      animation: 'isRight'
    }
  },
  {
    path: '**',
    redirectTo:'/login',
  },];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
