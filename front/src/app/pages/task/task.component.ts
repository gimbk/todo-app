import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { PagesService } from 'src/app/services/pages/pages.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  allTask :any

  constructor(private tokenStorage: TokenStorageService, private pagesService: PagesService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.allTask=this.fetchAllTasks();
    }
  }

  fetchAllTasks(): any {

    this.pagesService.allTask(this.tokenStorage.getUser().id).subscribe(
      data => {
        console.log(data);
        this.allTask = data;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  editTask(id:any): any {
    this.router.navigate(['/pages/edit-task/',id]);
  }

  viewTask(id:any): any {
    this.router.navigate(['/pages/view-task/',id]);
  }


  deleteTask(id:any): any {

    this.pagesService.delete(id).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  

}
