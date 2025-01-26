import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public invalidRegister: boolean = false;
  public msgErrorRegister: String = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.creatForm();
  }

  creatForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]] //Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    });
  }

  singUp(): void {
    this.invalidRegister = false;
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log("User login !!!", res);
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.invalidRegister = true;
          this.msgErrorRegister = err;
          console.log("Error login", err);
        }
      });
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

}
