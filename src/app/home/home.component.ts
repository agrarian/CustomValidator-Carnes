import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router,private _location: Location) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => { return false; }
   }

  async ngOnInit() {
  }

}
