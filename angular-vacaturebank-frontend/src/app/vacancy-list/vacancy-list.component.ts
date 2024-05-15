import { Component, OnInit } from '@angular/core';
import { Vacancy } from '../model/vacancy';
import { VacancyService } from '../service/vacancy-service.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { UserService } from '../service/user-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLocationDot, faEuroSign, faScrewdriverWrench, faClock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpFormDialogComponent } from './sign-up-form-dialog/sign-up-form-dialog.component';
import { MailService } from '../service/mail-service.service';
import { mailStructure } from '../model/mailStructure';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatBadgeModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    ScrollingModule,
    ReactiveFormsModule
  ]
})
export class VacancyListComponent implements OnInit {
  title = 'angular-vacaturebank';
  vacancies: Vacancy[] = [];
  selectedVacancy: number = 0;
  vacancyListCount: number = 0;
  faUser = faUser;
  faLocationDot = faLocationDot;
  faEuroSign = faEuroSign;
  faScrewdriverWrench = faScrewdriverWrench;
  faClock = faClock;
  filters = new FormControl('');
  salaryList: string[] = ['2000+', '4000+'];
  eduList: string[] = ['MBO', 'HBO', 'WO'];
  brancheList: string[] = ['ICT/IT'];
  maxHourList: string[] = ['20', '32', '40'];
  minHourList: string[] = ['20', '32', '40'];
  faGraduationCap = faGraduationCap
  constructor(private vacancyService: VacancyService, private mailService: MailService, public dialog: MatDialog) {
  
  }

  ngOnInit() {
    this.fetchVacancies();

    this.vacancyListCount = this.vacancies.length;
  }

  getIndex(index: any) {
    this.selectedVacancy = index;

  }

  fetchVacancies() {
    this.vacancyService.findAllVacancies().subscribe(
      (data: any) => {
        this.vacancies = data;
      },
      (error: any) => {
        console.error('Error fetching vacancies:', error);
      }
    );
  }
  openSignUpForm(vacancy:Vacancy) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dialogConfig: dialogConfig,
      vacancy: vacancy
    } 
    dialogConfig.autoFocus = true;   
    dialogConfig.width = '280px';
    dialogConfig.height = 'auto';
    dialogConfig.panelClass = 'sign-up-form-dialog';
    const dialogRef = this.dialog.open(SignUpFormDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      this.postMail(res.mail, res.files);
    })
  }
  postMail(mail: mailStructure, files: FormData){
    this.mailService.postMail(mail, files);
  }



}
