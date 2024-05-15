import { Branch } from "./branch";
import { Employer } from "./employer";


export class Vacancy {
    vacancyId!: number;
    vacancyName!: string;
    vacancyDescription!: string;
    vacancySalary!: string;
    vacancyEducation!: string;
    vacancyLocation!: string;
    vacancyWorkingHours!: string;
    vacancyUploadDate!: string;
    vacancyBranchesBranchId!: number;
    vacancyEmployersEmployerId!: number;
    employer!: Employer;
    branches!: Branch;
  }