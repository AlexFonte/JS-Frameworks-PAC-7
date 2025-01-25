import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:3000/api/user";
  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }): Observable<any> {
    console.log("Login user...", user);
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }


  register(user: { usermane: string, password: string }): Observable<any> {
    console.log("Sing Up new User...");
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

}
