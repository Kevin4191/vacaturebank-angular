import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Vacancy } from '../model/vacancy';
import { VacancyListComponent } from '../vacancy-list/vacancy-list.component';
import { VacancyService } from '../service/vacancy-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Branch } from '../model/branch';
import { CreateVacancyComponent } from '../create-vacancy/create-vacancy.component';
import { CreateVacancyService } from '../service/create-vacancy.service';
import { BranchService } from '../service/branch.service';


@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrl: './update-vacancy.component.css'
})
export class UpdateVacancyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private vacancyService: VacancyService, private createVacancyService: CreateVacancyService, public vacancyForm: FormBuilder, private router: Router, private branchService: BranchService) {

    this.updateVacancyForm = this.vacancyForm.group({
      vacancyName: [''],
      vacancyEducation: [''],
      vacancySalary: [''],
      vacancyLocation: [''],
      vacancyDescription: [''],
      vacancyWorkingHours: [''],
      vacancyBranchesBranchId: [''],

    })
  }
  updateVacancyForm!: FormGroup;
  vacancyId!: number;
  selectedVacancy!: Vacancy;
  branches: Branch[] = [];
  brancheList: string[] = [];
  userId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vacancyId =  +params.get('id')!;
      console.log(this.vacancyId)
    })
    this.vacancyService.getVacancyById(this.vacancyId).subscribe(vacancy => {
      this.selectedVacancy = vacancy;
      this.updateForm();
    })
    this.userId = localStorage.getItem('userId');
    this.fetchBranchList();
  }
  updateForm(): void {
    const { vacancyName, vacancyEducation, vacancySalary, vacancyLocation, vacancyDescription, vacancyWorkingHours } = this.selectedVacancy;
    this.updateVacancyForm.patchValue({
      vacancyName,
      vacancyEducation,
      vacancySalary,
      vacancyLocation,
      vacancyDescription,
      vacancyWorkingHours,

    });
  }
  removeCircularReferences(obj: any, seen = new WeakSet()): any {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return;
      }
      seen.add(obj);

      const result: any = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = this.removeCircularReferences(obj[key], seen);
        }
      }
      return result;
    }
    return obj;
  }

  updateVacancy(): void {
    const updatedVacancy = this.extractFormValues();
    this.createVacancyService.updateVacancy(updatedVacancy, this.vacancyId).subscribe(response => {
      console.log('Vacancy updated:', response);
    });
    this.router.navigate(['/home']);
  }

  extractFormValues(): any {
    const formValues = this.updateVacancyForm.value;
    return {
      ...formValues,
      vacancyBranchesBranchId: formValues.vacancyBranchesBranchId.branchId
    };
  }

  fetchBranchList() {
    this.branchService.findAllBranches().subscribe(
      (data: Branch[]) => {
        this.branches = data;
        this.branches.forEach(branch => {
          this.brancheList.push(branch.branchName);
        });

      },
      (error: any) => {
        console.error('Error fetching vacancies:', error);
      }
    );
  }

}
