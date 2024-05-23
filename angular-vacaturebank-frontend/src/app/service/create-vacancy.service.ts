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

  public updateVacancy(vacancy: any, id: number): Observable<any[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch<any[]>(`${this.vacancyUrl}/patch/${id}`, JSON.stringify(vacancy), {headers})
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);   console.log(vacancy)
          return throwError(error); 
          
        })
      );
  }

}
