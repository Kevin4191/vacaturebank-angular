import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mailStructure } from '../model/mailStructure';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private url = 'http://localhost:8080/api/v1/mail/send';

  constructor(private http: HttpClient) {
  }
  postMail(mail: mailStructure, files: FormData) {
    const formData = new FormData();
    formData.append('to', mail.to as string);
    formData.append('cc', mail.cc as string);
    formData.append('subject', mail.subject as string);
    formData.append('message', mail.message as string);
    for (let i = 0; i < files.getAll('file').length; i++) {
      formData.append('files', files.getAll('file')[i]);
    }

    return this.http.post(this.url, formData).subscribe(
      res => console.log(res),
      err => console.log("error sending mail: ", err)
    );
  }
}

