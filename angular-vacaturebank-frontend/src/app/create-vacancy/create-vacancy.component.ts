import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateVacancyService } from '../service/create-vacancy.service';
import { Branch } from '../model/branch';
import { BranchService } from '../service/branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrl: './create-vacancy.component.css'
})
export class CreateVacancyComponent implements OnInit {
  createVacancyForm!: FormGroup;
  userId: any;
  branches: Branch[] = [];
  brancheList: string[] = [];


  constructor(private createVacancyService: CreateVacancyService, private vacancyForm: FormBuilder, private branchService: BranchService, private router: Router) {
  }

  ngOnInit(): void {
    this.createVacancyForm = this.vacancyForm.group({
      createVacancyEdu: [''],
      createVacancyBranch: [''],
      createVacancyHours: [''],
      createVacancySalary: [''],
      createVacancyLocation: [''],
      createVacancyDescription: [''],
      createVacancyName: ['']
    })
    this.userId = localStorage.getItem('userId');
    this.fetchBranchList();
  }

  onSubmit(): void {
    const formattedData = this.formatFormData(this.createVacancyForm.value);
    if (this.createVacancyForm.valid) {
      this.createVacancyService.createVacancy(formattedData);
      this.router.navigate(['/home']);
    }
  }


  formatFormData(formData: any): any {

    return {
      vacancyId: "",
      vacancyName: formData.createVacancyName,
      vacancyDescription: formData.createVacancyDescription,
      vacancySalary: formData.createVacancySalary,
      vacancyEducation: formData.createVacancyEdu,
      vacancyLocation: formData.createVacancyLocation,
      vacancyWorkingHours: formData.createVacancyHours,
      vacancyUploadDate: "placeholder",
      vacancyBranchesBranchId: formData.createVacancyBranch.branchId,
      vacancyEmployersEmployerId: this.userId,
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
