import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Vacancy } from '../model/vacancy';
@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  private vacancyUrl: string;

  constructor(private http: HttpClient) {
    this.vacancyUrl = 'http://localhost:8080/api/v1/vacancies';
  }

  public findAllVacancies():Observable<any[]> {
    return this.http.get<any[]>(this.vacancyUrl);
  }

}
