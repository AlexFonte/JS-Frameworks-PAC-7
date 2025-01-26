import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public invalidLogin: boolean = false;
  public msgErrorLogin: String = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private uerStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute) {
    this.creatForm();
  }

  ngOnInit(): void {
    console.log("Is user loged ???");
    if (this.uerStore.isUserAuthenticated()) {
      console.log("User login !!!");
      this.router.navigate(['article/list']);
    }
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
    } else {
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
