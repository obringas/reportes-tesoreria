

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class URLService {

  public backURL =""

  constructor() {
    if( environment.backURL == 'local' ){
    //  console.log(window.location.origin)
     // this.backURL = window.location.origin+"/WebApiInformes/api"
      this.backURL = "http://localhost:52524/api"

     // this.backURL = window.location.origin+"/eCotizadorWebApiDebug/api"
    }
    else{
      //this.backURL = environment.backURL+"/WebApiInformes/api"
      this.backURL = "/api"
      // http://localhost:52524/api"
     // this.backURL ='http://coop_serv8/WebApiInformes/api'
   
    }
  }
}