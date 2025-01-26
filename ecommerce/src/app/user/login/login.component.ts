import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup
  public invalidLogin: boolean = false;
  public msgErrorLogin: String = '';

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router) {  
    this.creatForm();
  }

  creatForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]] //Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    });
  }

  login(): void {
    this.invalidLogin = false;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("User login !!!", res);
          this.loginForm.reset();
          this.userService.saveToken(res.token);
          this.router.navigate(['article/list']);
        },
        error: (err) => {
          this.invalidLogin = true;
          this.msgErrorLogin = err;
          console.log("Error login", err);
        }
      });
    }else{
      console.log("Formulario no valido");
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
