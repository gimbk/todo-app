import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { PagesService } from '../services/pages/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  countUsers=0;
  countTask=0
  
  constructor(private tokenStorage:TokenStorageService,private pagesService:PagesService,private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.fetchCountUser();
      this.fetchCountTask();
    }
  }

  fetchCountUser(): any{
    
    this.pagesService.countUser().subscribe(
      data => {
        console.log(data[0]);
        this.countUsers =data[0].list;
      },
err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  fetchCountTask(): any{
    
    this.pagesService.counttask().subscribe(
      data => {
        console.log(data[0]);
        this.countTask =data[0].list;
      },
err => {
        this.errorMessage = err.error.message;
      }
    );
  }

}
