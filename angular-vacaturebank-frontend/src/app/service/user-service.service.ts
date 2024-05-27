import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { userDTO } from '../model/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;
  private logInUrl: string;
  userDTO: userDTO | null = null;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/api/v1/users';
    this.logInUrl = 'http://localhost:8080/api/v1/users/login';
  }
  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public postUser(logIn: any): Observable<any> {
    return this.http.post(this.logInUrl, logIn, { observe: 'response' }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return of(null as userDTO | null);
        }
        return throwError(error);
      })
    );
  }

}
