import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupformComponent} from "./signupform/signupform.component";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      animation: 'isLeft',
      newRegister: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animation: 'isLeft',
      newRegister: false
    }
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
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
