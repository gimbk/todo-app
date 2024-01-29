import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingService } from '../setting/setting.service';
import { TokenStorageService } from '../auth/token-storage.service';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json',"accept": "application/json" })
// };
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  apiUrlRoot: any;
  entities: any;
  entity: any;
  token: any;
  httpOptions: any;

  constructor(private httpClient:HttpClient, private settingService:SettingService,private tokenStorage:TokenStorageService) { }

  checkToken() {
    this.token= this.tokenStorage.getToken();
    
    console.log( this.tokenStorage.getToken());
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        ,"accept": "application/json",
        
        'Authorization': this.token
        },
      )
    };
    console.log( this.httpOptions);

  }


  // count user
  countUser():Observable<any>{
    //this.checkToken();
    return this.httpClient.get(this.settingService.getDomainUrl()+'/auth/countUser',this.httpOptions);
  }


  // count tasks
  counttask():Observable<any>{
    this.checkToken();
    return this.httpClient.get(this.settingService.getDomainUrl()+'/tasks/countTask',this.httpOptions);
  }

  // all tasks
  allTask(id:any):Observable<any>{
    this.checkToken();
    return this.httpClient.get(this.settingService.getDomainUrl()+'/tasks/'+id,this.httpOptions);
  }

   // create tasks
   create(data:any):Observable<any>{
    this.checkToken();
    return this.httpClient.post(this.settingService.getDomainUrl()+'/tasks/',data,this.httpOptions);
  }

  // one tasks
  oneTask(id:any):Observable<any>{
    this.checkToken();
    return this.httpClient.get(this.settingService.getDomainUrl()+'/tasks/one/'+id,this.httpOptions);
  }

   // delete tasks
   delete(id:any):Observable<any>{
    this.checkToken();
    return this.httpClient.delete(this.settingService.getDomainUrl()+'/tasks/'+id,this.httpOptions);
  }

  // edit tasks
  editTask(data:any):Observable<any>{
    this.checkToken();
    return this.httpClient.put(this.settingService.getDomainUrl()+'/tasks/',this.httpOptions);
  }
}
