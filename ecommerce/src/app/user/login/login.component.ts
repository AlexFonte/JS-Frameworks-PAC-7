import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleQuantityChange } from '../../model/article-quantity-change';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup
  public invalidLogin: boolean = false;
  public msgErrorLogin: String = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
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
      this.userService.login(this.loginForm.value).subscribe(
        success => {
        console.log("User login !!!", success);
        this.loginForm.reset();
      },
      error => {
        this.invalidLogin = true;
        this.msgErrorLogin = error;
        console.log("Error login", error);
      });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
