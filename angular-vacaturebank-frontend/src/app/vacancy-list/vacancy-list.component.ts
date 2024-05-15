import { Component, OnInit } from '@angular/core';
import { Vacancy } from '../model/vacancy';
import { VacancyService } from '../service/vacancy-service.service';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { UserService } from '../service/user-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLocationDot, faEuroSign, faScrewdriverWrench, faClock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpFormDialogComponent } from './sign-up-form-dialog/sign-up-form-dialog.component';
import { MailService } from '../service/mail-service.service';
import { mailStructure } from '../model/mailStructure';
import { SharedModule } from '../shared/shared.module';
import { FilterPipe } from '../filter.pipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: 'vacancy-list.component.html',
  styleUrl: 'vacancy-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatBadgeModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    ScrollingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    FilterPipe
  ]
})
export class VacancyListComponent implements OnInit {
  title = 'angular-vacaturebank';
  searchValue: any;
  searchLocation: any;
  vacancies: Vacancy[] = [];
  vacancyListCount: number = 0;
  selectedVacancy: Vacancy | null = null;
  filteredVacancies: Vacancy[] = [];
  vacancyDate: string | undefined;
  faUser = faUser;
  faLocationDot = faLocationDot;
  faEuroSign = faEuroSign;
  faScrewdriverWrench = faScrewdriverWrench;
  faClock = faClock;
  faGraduationCap = faGraduationCap;
  filters = new FormGroup({
    searchValue: new FormControl(''),
    searchLocation: new FormControl(''),
    distanceOption: new FormControl(''),
    brancheOption: new FormControl(''),
    eduOption: new FormControl(''),
    salaryOption: new FormControl(''),
    minHourOption: new FormControl(''),
    maxHourOption: new FormControl('')
  });
  salaryList: string[] = ['2000+', '3000+', '4000+', '5000+'];
  eduList: string[] = ['MBO', 'HBO', 'WO'];
  brancheList: string[] = ['ICT/IT', 'SD'];
  minHourList: string[] = ['12', '16', '20', '24', '28', '32', '36', '40'];
  maxHourList: string[] = ['12', '16', '20', '24', '28', '32', '36', '40'];
  locationControl = new FormControl();
  selectedLocation: any;
  searchForm: FormGroup;
 
  constructor(private vacancyService: VacancyService, private userService: UserService, private filterPipe: FilterPipe, private http: HttpClient, private mailService: MailService, public dialog: MatDialog) {
    this.setupLocationAutocomplete();
    this.searchForm = new FormGroup({
      distanceOption: new FormControl('') // FormControl for distance select
    });
  }

  ngOnInit() {
    this.fetchVacancies();
    this.filterVacancies();
    this.vacancyListCount = this.vacancies.length;

    if (this.filteredVacancies.length > 0) {
      this.selectedVacancy = this.filteredVacancies[0];
    }
    
  }

  getIndex(vacancy: Vacancy) {
    this.selectedVacancy = vacancy;

    const vacancyDateSplit = this.selectedVacancy?.vacancyUploadDate?.split(' ');
    this.vacancyDate = vacancyDateSplit ? vacancyDateSplit[0] : undefined;
  }

  fetchVacancies() {
    this.vacancyService.findAllVacancies().subscribe(
      (data: Vacancy[]) => {
        this.vacancies = data;
        this.updateFilteredVacancies();
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

  filterVacancies() {
    this.updateFilteredVacancies();
    // Reset selected vacancy when filtering
    if (this.filteredVacancies.length > 0) {
      this.selectedVacancy = this.filteredVacancies[0];

      const vacancyDateSplit = this.selectedVacancy?.vacancyUploadDate?.split(' ');
      this.vacancyDate = vacancyDateSplit ? vacancyDateSplit[0] : undefined;
    }

    const selectedLocation = this.searchForm.get('searchLocation')?.value;
    this.searchLocations(selectedLocation).subscribe(
    (details) => {
      console.log('Location Details:', details);
      // Do further processing with location details
    },
    (error) => {
      console.error('Error fetching location details:', error);
    }
  );
  }

  updateFilteredVacancies(): void {
    const salaryOptionValue = this.filters.value.salaryOption;
    let chosenSalary: number | undefined;

    if (salaryOptionValue !== null && salaryOptionValue !== undefined) {
      const salaryInput: string = salaryOptionValue;
      const salaryString = salaryInput.split('+')[0];
      chosenSalary = parseInt(salaryString, 10);
    }

    this.filteredVacancies = this.vacancies.filter(vacancy => {
      let minHour: number | undefined;
      let maxHour: number | undefined;
      if(vacancy.vacancyWorkingHours.length > 2){
        const hourRange = vacancy.vacancyWorkingHours.split('-');
        minHour = parseInt(hourRange[0], 10);
        maxHour = parseInt(hourRange[1], 10);
      } else {
        const vacancyWorkingHoursInt = parseInt(vacancy.vacancyWorkingHours, 10);
        minHour = vacancyWorkingHoursInt;
        maxHour = vacancyWorkingHoursInt;
      }
      
      let vacancySalary: number | undefined;
      if (vacancy.vacancySalary.length >= 8) {
        const salaryRange = vacancy.vacancySalary.split('-');
        vacancySalary = parseInt(salaryRange[1], 10);
      } else {
        vacancySalary = parseInt(vacancy.vacancySalary, 10);
      }

      const matchesSearch = !this.searchValue || vacancy.vacancyName.toLowerCase().includes(this.searchValue.toLowerCase());
      // const matchesLocation = !this.searchLocation || vacancy.vacancyLocation.toLowerCase().includes(this.searchLocation.toLowerCase());
      const selectedBrancheOptionValue = this.filters.value.brancheOption;
      const matchesBranch = !selectedBrancheOptionValue || vacancy.branches.branchName === selectedBrancheOptionValue;
      const selectedEduOptionValue = this.filters.value.eduOption;
      const matchesEdu = !selectedEduOptionValue || vacancy.vacancyEducation === selectedEduOptionValue;
      const matchesSalary = !chosenSalary || chosenSalary === undefined || vacancySalary === undefined || vacancySalary >= chosenSalary;
      const selectedMinHoursOptionValue = this.filters.value.minHourOption !== null && this.filters.value.minHourOption !== undefined ?
      parseInt(this.filters.value.minHourOption, 10) :
      NaN;
      const matchesMinHours = !selectedMinHoursOptionValue || minHour === undefined || minHour >= selectedMinHoursOptionValue;
      const selectedMaxHoursOptionValue = this.filters.value.maxHourOption !== null && this.filters.value.maxHourOption !== undefined ?
      parseInt(this.filters.value.maxHourOption, 10) :
      NaN;
      const matchesMaxHours =  !selectedMaxHoursOptionValue || maxHour === undefined || maxHour <= selectedMaxHoursOptionValue;

      // return matchesSearch && matchesLocation && matchesBranch && matchesEdu && matchesSalary && matchesMinHours && matchesMaxHours;
      return matchesSearch && matchesBranch && matchesEdu && matchesSalary && matchesMinHours && matchesMaxHours;
    });
  }

  // Function to autocomplete input data
  private setupLocationAutocomplete() {
    this.locationControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.searchLocations(query))
    ).subscribe((locations: any[]) => {
      // Handle autocomplete suggestions here
    });
  }

  // Function to get location data on keyword
  searchLocations(query: string): Observable<any[]> {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;

    return this.http.get<any[]>(apiUrl).pipe(
      map(response => response.map(item => ({
        // extract location data
        name: item.display_name,
        latitude: item.lat,
        longitude: item.lon,
      })))
    );
  }

  // Function to get location details
  getLocationDetails(location: any): Observable<any> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`;

    return this.http.get<any>(apiUrl);
  }

  // Function to handle location selection
  handleLocationSelection() {
    if (this.selectedLocation) {
      this.getLocationDetails(this.selectedLocation).subscribe(
        (details) => {
          console.log('Location Details:', details);
          // Display the location details to the user
        },
        (error) => {
          console.error('Error fetching location details:', error);
        }
      );
    }
  }
}
