import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Branch } from '../model/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private branchUrl: string;

  constructor(private http: HttpClient) {
    this.branchUrl = 'http://localhost:8080/api/v1/branches';
  }

  public findAllBranches():Observable<any[]> {
    return this.http.get<any[]>(this.branchUrl);
  }

}
