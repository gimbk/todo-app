import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingService } from '../setting/setting.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',"accept": "application/json" })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private settingService:SettingService) { }
  // register
  signUp(data:any):Observable<any>{
    return this.httpClient.post(this.settingService.getDomainUrl()+'/auth/register',data);

  }

  // login
  signIn(username:string,password:string):Observable<any>{
    return this.httpClient.post(this.settingService.getDomainUrl()+'/auth/login',{username,password},httpOptions);

  }
}
