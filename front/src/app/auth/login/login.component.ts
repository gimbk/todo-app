import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  

  constructor(private tokenStorage:TokenStorageService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
   
    }
  }
    onSubmit(): void{
      const { username, password } = this.form;
      this.authService.signIn( username, password).subscribe(
        data => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          
          this.router.navigate(['/pages/users']);
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

  



