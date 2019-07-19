import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {slider} from './route-animations';
import {HttpClient} from "@angular/common/http";
import {AppService} from "./app.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
})
export class AppComponent {

  title = 'Spring Angular Project';
  constructor(
    private app: AppService,
    private httpClient: HttpClient,
    private router: Router
  ){
    //this.app.authenticate(undefined,undefined);
  }

  logout(){
    this.httpClient.post('/logout',{}).pipe(finalize(() => {
      this.app.authenticated=false;
      this.router.navigateByUrl('/login');
    })).subscribe();
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }
}
