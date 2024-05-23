import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateVacancyService {

  private vacancyUrl: string;

  constructor(private http: HttpClient) {
    this.vacancyUrl = 'http://localhost:8080/api/v1/createVacancy';
  }


  public createVacancy(vacancyData: any): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.vacancyUrl, JSON.stringify(vacancyData), { headers })
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

}
