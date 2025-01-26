import { Component, EventEmitter, Output } from '@angular/core';
import { UserStoreService } from '../user/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(public userStore: UserStoreService, private router: Router) { }

  logout(): void {
    this.userStore.logout();
    this.router.navigate(['login']);
  }

}
