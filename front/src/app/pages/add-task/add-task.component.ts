import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { PagesService } from 'src/app/services/pages/pages.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  submitted = false;
  returnUrl= "";
  hide = true;
  chide = true;
  isLoading=false;
  error= '';
  errorMessage: any;
  message='';
  status=false;

// Modèle pour stocker les valeurs du formulaire
formulaireModel: any = {
  title: '',
  description: '',
  user_id:''
};
  constructor(
    private pagesService:PagesService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.formulaireModel.user_id=this.tokenStorage.getUser().id;
    }
  }

  onSubmit() {
   
      this.pagesService
        .create(this.formulaireModel)
        .subscribe(
          
          (res) => {
            console.log(res)
            this.message=res.message;
            this.router.navigate(['/pages/task/']);
          },
          
          (error) => {
            this.errorMessage = error; 
            this.submitted = false;

          } 
        );
    }
    public hideError():void{
      this.errorMessage=null;
    
    }


}
