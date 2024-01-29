import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { PagesService } from 'src/app/services/pages/pages.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  form: any = {
    id:null,
    title: null,
    description: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  oneTask:any;
  title= "";
  description="";
  
  

  constructor(private tokenStorage:TokenStorageService,private pagesService:PagesService,private router:Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.form.id = this.route.snapshot.paramMap.get('id');
      this.showTask(this.form.id)
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


    onSubmit(): void{
      this.pagesService.editTask( this.form).subscribe(
        data => {
          console.log(data);
         
          this.router.navigate(['/pages/task']);
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
