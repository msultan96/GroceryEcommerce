import { Component, OnInit } from '@angular/core';
import {UserModel} from "../user-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  user: UserModel = {
    userName:'',
    email:'',
    firstName:'',
    lastName:''
  };

  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      successUser:UserModel
    };
    if(state) {
      this.user = state.successUser;
    }
    else{
      this.router.navigate(['login']);
    }

  }

  ngOnInit() {
  }

}
