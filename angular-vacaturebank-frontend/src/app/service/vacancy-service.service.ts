import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ValueFromNotification, catchError, map, of, throwError } from 'rxjs';
import { Vacancy } from '../model/vacancy';
@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  private vacancyUrl: string;
  public vacancies: Vacancy[] = [];




  constructor(private http: HttpClient) {
    this.vacancyUrl = 'http://localhost:8080/api/v1/vacancies';

  }

  public findAllVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.vacancyUrl).pipe(
      map(data => {
        this.vacancies = data;
        return this.vacancies;
      })
    );
  }

  getVacancyById(id: Number): Observable<any> {
    return this.http.get<any>(`${this.vacancyUrl}/${id}`);
  }
  
}
