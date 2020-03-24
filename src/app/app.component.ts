import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Environment } from './models/environment';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router } from "@angular/router";
import {EnvironmentService} from './services/environment.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentItem = "";
  title = "ePM Reports Portal"
  version: string;
  today: Date = new Date();
  opened = false;
  appVersion = environment.VERSION;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver,private _router: Router,
    private _envService: EnvironmentService ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
   }

   async ngOnInit(){
     this.version = this._envService.getVersion();
   }
  onMenuClick(item:string){
    this.opened = !this.opened;
    this.currentItem = "";
    if(item == "HOME"){
      this.currentItem = " / Home";
      this._router.navigate(["#"]);
    }
    if(item == "TQC"){
      this.currentItem = " / Text Report";
      this._router.navigate(["text-report"]);
    }
  }
}
