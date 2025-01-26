import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _tokenKey: string = 'authToken';

  constructor() {}

  setToken(token: string):void {
    localStorage.setItem(this._tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this._tokenKey); 
  }

  isUserAuthenticated():boolean {
    return this.getToken() != null;
  }

  logout(): void {
    localStorage.removeItem(this._tokenKey);
  }

}
