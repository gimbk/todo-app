import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  username: '',
  password: ''
};
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Formulaire soumis !', this.formulaireModel);
   // console.log(this.f.name.value, this.f.password.value,this.f.email.value,this.f.firstName.value)
    //this.submitted = true;


      //this.isLoading=true;
      
      this.authService
        .signUp(this.formulaireModel)
        .subscribe(
          
          (res) => {
            console.log(res)
            this.message=res.message;
 
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
