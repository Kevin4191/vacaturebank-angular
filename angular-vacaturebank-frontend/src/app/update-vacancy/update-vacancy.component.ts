import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from '../model/vacancy';
import { VacancyListComponent } from '../vacancy-list/vacancy-list.component';
import { VacancyService } from '../service/vacancy-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrl: './update-vacancy.component.css'
})
export class UpdateVacancyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private vacancyService: VacancyService, public vacancyForm: FormBuilder) {

    this.updateVacancyForm = this.vacancyForm.group({
      vacancyName: [''],
      vacancyEducation: [''],
      vacancySalary: [''],
      vacancyLocation: [''],
      vacancyDescription: [''],
      vacancyWorkingHours: [''],
      vacancyBranch: [''],

    })


  }
  updateVacancyForm!: FormGroup;
  vacancyId!: number;
  selectedVacancy!: Vacancy;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vacancyId = +params.get('vacancyId')! + 1;
    })
    this.vacancyService.getVacancyById(this.vacancyId).subscribe(vacancy => {
      this.selectedVacancy = vacancy;
      this.updateForm()
    })
  }
  updateForm(): void {
    this.updateVacancyForm.patchValue({
      vacancyName: this.selectedVacancy.vacancyName,
      vacancyEducation: this.selectedVacancy.vacancyEducation,
      vacancySalary: this.selectedVacancy.vacancySalary,
      vacancyLocation: this.selectedVacancy.vacancyLocation,
      vacancyDescription: this.selectedVacancy.vacancyDescription,
      vacancyWorkingHours: this.selectedVacancy.vacancyWorkingHours,
      vacancyBranch: this.selectedVacancy.branches.branchName,
    });
  }

  extractFormValues(): Vacancy {
    return {
      vacancyId: this.vacancyId,
      vacancyName: this.updateVacancyForm.get('vacancyName')?.value,
      vacancyEducation: this.updateVacancyForm.get('vacancyEducation')?.value,
      vacancySalary: this.updateVacancyForm.get('vacancySalary')?.value,
      vacancyLocation: this.updateVacancyForm.get('vacancyLocation')?.value,
      vacancyDescription: this.updateVacancyForm.get('vacancyDescription')?.value,
      vacancyWorkingHours: this.updateVacancyForm.get('vacancyWorkingHours')?.value,
      branches: { branchId: 1, branchName: this.updateVacancyForm.get('vacancyBranch')?.value,},
      vacancyBranchesBranchId: 1,
      vacancyEmployersEmployerId: 1,
      vacancyUploadDate: '',
      employer: this.selectedVacancy.employer
    };
  }

  updateVacancy() {
    const updatedVacancy: Vacancy = this.extractFormValues();
   this.vacancyService.updateVacancy(updatedVacancy, this.vacancyId)
  }

}
