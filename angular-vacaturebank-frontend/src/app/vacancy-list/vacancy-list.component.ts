import { Component, OnInit } from '@angular/core';
import { Vacancy } from '../model/vacancy';
import { VacancyService } from '../service/vacancy-service.service';
import { CommonModule } from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { User } from '../model/user';
import { UserService } from '../service/user-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLocationDot, faEuroSign, faScrewdriverWrench, faClock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from '@angular/material/button'; 
import {ScrollingModule} from '@angular/cdk/scrolling'
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
    ScrollingModule
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
  faGraduationCap = faGraduationCap

  constructor(private vacancyService: VacancyService, private userService: UserService) {
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
        console.log(this.vacancies)
      },
      (error: any) => {
        console.error('Error fetching vacancies:', error);
      }
    );
  }



}
