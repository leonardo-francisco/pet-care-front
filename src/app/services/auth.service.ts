import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7288/api';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any>{
    const url = `${this.baseUrl}/Roles`;
    return this.http.get<any>(url);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/Authentication/login`;
    const body = { email, password };
    return this.http.post<any>(url, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  register(user: UserModel): Observable<UserModel>{
    const url = `${this.baseUrl}/Authentication/registrar`;
    const body = user;
    return this.http.post<any>(url, body);
  }

  recoveryPassword(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/Authentication/recovery-password`;
    const body = { email, password };
    return this.http.post<any>(url, body);
  }
}
