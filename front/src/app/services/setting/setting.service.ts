import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class SettingService {
  public domain="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
   getDomain(){
    return this.domain;
   }

   getDomainUrl(){
    return this.getDomain()+"";
   }
}
