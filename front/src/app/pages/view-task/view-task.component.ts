import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { PagesService } from 'src/app/services/pages/pages.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  oneTask:any;
  id="";
  title= "";
  description="";
  
  

  constructor(private tokenStorage:TokenStorageService,private pagesService:PagesService,private router:Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.showTask(this.route.snapshot.paramMap.get('id'))
    }
  }

  showTask(id:any): any {

    this.pagesService.oneTask(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(data);
        this.oneTask = data[0];
        this.title = data[0].title;
        this.description = data[0].description;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


    
  
    reloadPage(): void {
      window.location.reload();
    }



}
